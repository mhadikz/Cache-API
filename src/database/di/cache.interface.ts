import { ICache as Cache} from "../schema/cache.schema";

export interface ICacheRepo { 
    getData (key: string): Promise<Cache>
    getAllData (): Promise<Cache[]>
    createOrUpdateData (): Promise<Cache>
    removeData (): Promise<Cache>
    removeAllData (): Promise<Cache[]>
  }