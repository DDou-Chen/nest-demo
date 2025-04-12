import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CccDto {
  @ApiProperty({
    name: 'aaa',
    enum: ['a1', 'a2', 'a3'],
    maxLength: 30,
    minLength: 2,
  })
  aaa: string;

  @ApiPropertyOptional({
    name: 'bbb',
    maximum: 60,
    minimum: 40,
    default: 50,
    example: 55,
  }) // ApiPropertyOptional 可选，和 @ApiProperty({ required: false }) 等价
  bbb: number;

  @ApiProperty({ name: 'ccc' })
  ccc: Array<string>;
}
