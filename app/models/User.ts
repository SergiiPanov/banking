import { Model, QueryBuilderType } from "objection";

export default class User extends Model {
  static get tableName() {
    return "user";
  }

  readonly id!: number;

  first_name: string;
  last_name: string;
  password: string;
  day_of_birthday: string;
  age: string;

  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;

  is_active: boolean;

  static modifiers = {
    defaultSelects(builder: QueryBuilderType<any>) {
      builder.select("id", "first_name", "last_name", "password", "day_of_birthday", "age");
    },
  };
}
