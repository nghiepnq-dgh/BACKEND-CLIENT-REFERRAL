import { Repository, EntityRepository } from "typeorm";
import { History } from "./history.entity";

@EntityRepository(History)
export class HistoryRepository extends Repository<History> {
    
}