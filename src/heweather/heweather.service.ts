import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { importPKCS8, importSPKI, jwtVerify, SignJWT } from 'jose';
import { pinyin } from 'pinyin-pro';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HeweatherService {
  private token: string;
  private readonly secret =
    '-----BEGIN PRIVATE KEY-----MC4CAQAwBQYDK2VwBCIEIAEUwJgPgVWsqSYaP2FhKOhPpeaQHqgqW+loWdsnYskG-----END PRIVATE KEY-----'; // 和风天气提供的密钥
  private readonly PUBLIC_KEY =
    '-----BEGIN PUBLIC KEY-----MCowBQYDK2VwAyEA4lGYDt2IzZO+iuKWbjaAgQkBZRXxTB8W9h1/PSkzrdM=-----END PUBLIC KEY-----'; // 和风天气提供的密钥

  constructor(private readonly httpService: HttpService) {
    this.getToken();

    httpService.axiosRef.interceptors.request.use((config) => {
      config.headers['Authorization'] = `Bearer ${this.token}`;
      return config;
    });
  }

  async getToken() {
    if (this.token) {
      return this.token;
    }

    importPKCS8(this.secret, 'EdDSA')
      .then((privateKey) => {
        const customHeader = {
          alg: 'EdDSA',
          kid: 'TBB6BJF6QU',
        };
        const iat = Math.floor(Date.now() / 1000) - 30;
        const exp = iat + 900;
        const customPayload = {
          sub: '4NKPCCCJ4R',
          iat: iat,
          exp: exp,
        };
        new SignJWT(customPayload)
          .setProtectedHeader(customHeader)
          .sign(privateKey)
          .then((token) => {
            this.token = token;
            console.log('JWT: ' + token);
          });
      })
      .catch((error) => console.error(error));
  }

  async verifyToken(): Promise<any> {
    const publicKey = await importSPKI(this.PUBLIC_KEY, 'EdDSA');

    const { payload } = await jwtVerify(this.token, publicKey);
    console.log('payload', payload);

    return payload;
  }

  /**
   * 获取城市天气
   * @param city
   * @returns
   */
  async getWeather(city: string) {
    const cityList = await this.getCityInfo(city);
    const cityId =
      cityList.find((item) => item.name === 'city')?.id || cityList[0].id || '';

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`/v7/weather/now`, {
          params: {
            location: cityId,
          },
        }),
      );

      return data;
    } catch (error) {
      throw new Error('getWeather err');
    }
  }

  async getCityInfo(city: string): Promise<any[]> {
    const cityPinyin = pinyin(city, { toneType: 'none', type: 'array' }).join(
      '',
    );

    try {
      const { data } = await firstValueFrom(
        this.httpService.get('/geo/v2/city/lookup', {
          params: {
            location: cityPinyin,
          },
        }),
      );

      return data.location;
    } catch (error) {
      throw new Error('getCityInfo err');
    }
  }
}
