export default class Service {
    constructor(dao) {
        this.dao = dao;
    };

    getAll = async () => {
        try{
            const items = await this.dao.getAll();
            if(!items){
                return false
            }else {
                return items
            };
        }catch(error){
            throw new Error(error.message);
        };
    };

    getById = async (id) =>{
        try{
            const item = await this.dao.getById(id);
            if(!item){
                return false
            }else {
                return item
            };
        }catch(error){
            throw new Error(error.message);
        };
    };

    create = async (obj) => {
        try{
            const newItem = await this.dao.create(obj);
            if(!newItem){
                return false;
            }else {
                return newItem
            };
        }catch(error){
            throw new Error(error.message);
        };
    };

    update = async (id, obj) => {
        try{
            let item = await this.dao.getById(id);
            if(!item){
                return false;
            }else {
                const updateItem = await this.dao.update(id, obj);
                return updateItem;
            };
        }catch(error){
            throw new Error(error.message);
        };
    };

    delete = async (id) => {
        try{
            let item = await this.dao.getById(id);
            if(!item){
                return false;
            }else {
                const itemDeleted = await this.dao.delete(id);
                return itemDeleted;
            }
        }catch(error){
            throw new Error(error.message);
        };
    };
    
};