import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import {  CustomerService } from './customer.service';
import { CreateDocFileDto } from './dto/create_doc_file.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/decorator/get-user.decorator';
import { CreateQueryDto } from './dto/query_param.dto';
import { Client } from '../auth/client.entity';
@Controller('document')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  async createDocument(
    @Body(ValidationPipe) createDocFileDto: CreateDocFileDto,
  ) {
    const result = await this.customerService.createDocService(
      createDocFileDto,
    );
    return { ...result, success: true };
  }

  @Get()
  @UseGuards(AuthGuard())
  async getAllDoc(
    @GetUser() client: Client,
    @Query(ValidationPipe) createQueryDto: CreateQueryDto,
  ) {
    const result = await this.customerService.getAllDoc(client, createQueryDto);
    return { data: result[0], total: result[1] };
  }

}
