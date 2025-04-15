import { SetMetadata } from '@nestjs/common';
import { ClassTransformOptions } from 'class-transformer';

export const CLASS_SERIALZER_OPTIONS = 'class_serialzer:options';

export const SerializeOptions = (options: ClassTransformOptions) =>
  SetMetadata(CLASS_SERIALZER_OPTIONS, options);
