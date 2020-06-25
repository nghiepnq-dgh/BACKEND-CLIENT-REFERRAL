import { Repository, EntityRepository } from 'typeorm';
import { CreateDocFileDto } from './dto/create_doc_file.dto';
import { CreateQueryDto } from './dto/query_param.dto';
import { ROLE_USER } from 'src/contants';
import { BadRequestException } from '@nestjs/common';
import { Customer } from './customer.entity';
import { Client } from '../auth/client.entity';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  async createDocumentRepository(
    createDocFileDto: CreateDocFileDto,
    client: Client,
  ) {
    const { email, contend, identity } = createDocFileDto;
    const document = new Customer();
    document.client = client;
    document.contend = contend;
    //save document
    console.log('document', document);

    const result = await this.save({
      ...document,
    });
    return result;
  }

  async getAllDocRepository(client: Client, createQueryDto: CreateQueryDto) {
    const { id } = client;
    const { limit, page, document_id: documentId } = createQueryDto;

    const _limit = limit ? limit : 10;
    const where = {
      relations: ['user'],
    };

    if (page) {
      where['skip'] = (+page - 1) * +_limit;
      where['take'] = +_limit;
    }
    
    if (documentId) {
      where['id'] = documentId;
    }
    const result = await this.findAndCount({
      ...where,
    });

    return result;
  }

  async getDocByIdRepository(id: number) {
    const result = await this.findOne(id, { relations: ['user'] });
    if (!result) throw new BadRequestException('Không tìm thấý hồ sơ');
    return result;
  }
}
