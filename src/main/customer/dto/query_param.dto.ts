import {
    IsNotEmpty,
    IsEmail,
    Min,
    Max,
    IsNumber,
    IsOptional,
} from 'class-validator';

export class CreateQueryDto {
    @IsOptional()
    page: number;

    @IsOptional()
    limit: number;

    @IsOptional()
    document_id: string;
}
