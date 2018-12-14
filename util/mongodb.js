/**
 * Created by Bkz on 2018/12/13.
 */

const mongoose = require('mongoose');
const tableConfig = require('../config/collections');
const serverConfig = require('../config/serverConfig');


class MongooseHandlers {

    constructor(){
        this.connection_pool = {};
        this.mongoClient = {
            "pro":{}
        };

        this.DBMap = {
            'pro':{
                url: "mongodb://" + serverConfig.MONGO.host + ":" + serverConfig.MONGO.port + "/" + serverConfig.MONGO.proName,
                option: {
                    auto_reconnect: true,
                    pollSize: 10,
                    native_parser: true
                },
                table: tableConfig
            }
        }
    }

    createConnection(dbName){
        if (!dbName || this.connection_pool[dbName]) return;
        let info = this.DBMap[dbName], conn;
        if (info) {
            console.log('创建数据库连接：', info.url);
            conn = mongoose.createConnection(info.url, info.option)
            this.connection_pool[dbName] = conn;
            conn.on('connected', (err) => {
                if (err) {
                    console.error('Database connection failure');
                    if (global.MONGO_Handler) {
                        delete global.MONGO_Handler.connection_pool[dbName];
                    }
                }
            });

            conn.on('error', (err) => {
                console.error('Mongoose connected error ' + err);
            });

            conn.on('disconnected', () => {
                console.error('Mongoose disconnected');
                if (global.MONGO_Handler) {
                    delete global.MONGO_Handler.connection_pool[dbName];
                }
            })
        }
        return conn;
    }

    init(){
        this.createConnection('pro');
    }

    getModel(db_name, table_name){
        if (!db_name || !this.mongoClient[db_name] || !this.DBMap[db_name] || !table_name){
            console.log('初始化表出错');
            return;
        }
        let connection = this.connection_pool[db_name];
        let model = this.mongoClient[db_name][table_name];
        let nodeSchema;
        if (!model && connection) {
            let tableConf = this.DBMap[db_name].table;
            if (!tableConf[table_name]) {
                console.error("[表", table_name, "] 不存在");
                return false;
            }
            nodeSchema = new mongoose.Schema(tableConf[table_name], {_id: false, versionKey: false});
            //构建model
            model = connection.model(table_name, nodeSchema, table_name);

            this.mongoClient[db_name][table_name] = model;
        }
        return model;
    }


    /**
     * 保存数据
     * @param db_name
     * @param table_name
     * @param query
     * @returns {Promise<*>}
     */
    async saveTableData(db_name,table_name,query){
        let model = this.getModel(db_name,table_name);
        let modelData = new model(query);
        return await modelData.save()
    }

    /**
     * 查找一条数据
     * @param db_name
     * @param table_name
     * @param query
     * @returns {Promise<*>}
     */
    async findOneInTable(db_name,table_name,query){
        let module = this.getModel(db_name,table_name);
        return await module.findOne(query);
    }


    /**
     * 根据条件查询
     * @param db_name
     * @param table_name
     * @param query
     * @param sort
     * @param limit
     * @returns {Promise<void>}
     */
    async findInTableByQuery(db_name,table_name,query,sort,limit){
        let module = this.getModel(db_name,table_name);
        return await module.find(query).sort(sort).limit(limit);
    }

    /**
     * 根据要求返回数据
     * @param db_name
     * @param table_name
     * @param query
     * @param query
     * @param skipNum
     * @param pageSize
     * @param sort
     * @returns {Promise<void>}
     */
    async findInTableBySizeAndNum(db_name,table_name,query,skipNum,pageSize,sort){
        let module = this.getModel(db_name,table_name);
        return await module.find(query).skip(skipNum).limit(pageSize).sort(sort);
    }

}

if (!global.MONGO_Handler) global.MONGO_Handler = new MongooseHandlers();
module.exports = global.MONGO_Handler;