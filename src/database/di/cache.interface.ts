import { ICache as Cache} from "../schema/cache.schema";

export interface ICacheRepo { 
    getData (key: string): Promise<Cache>
    getAllData (): Promise<Cache[]>
    createOrUpdateData (data: Cache): Promise<Cache>
    removeData (key: string): Promise<Cache>
    removeAllData (): Promise<any>
  }