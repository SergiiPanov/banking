import { Model, QueryBuilderType } from "objection";

export default class BanksPermission extends Model {
    static get tableName() {
        return "banks_permission";
    }

    readonly id!: number;

    bank_name: boolean;
    first_name: boolean;
    last_name: boolean;
    password: boolean;
    day_of_birthday: boolean;
    age: boolean;

    created_at: Date;
    updated_at: Date;
    created_by: string;
    updated_by: string;

    is_active: boolean;

    static modifiers = {
        defaultSelects(builder: QueryBuilderType<any>) {
            builder.select("id", "first_name", "last_name", "password", "day_of_birthday", "age", "bank_name");
        },
    };
}
