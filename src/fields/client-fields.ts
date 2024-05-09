import {FormItemConfig} from "@/types.ts";
import {ClientModel} from "@/models/ClientModel.ts";

export const clientConfig: FormItemConfig<ClientModel>[] = [
  {
    field: 'phone',
    required: () => true,
    validateRule: (
      __: unknown,
      _: unknown,
      value: string,
      cb: Function
    ) => {
      if (value.length < 18) {
        cb(
          new Error(
            `Телефон заполнен не до конца`
          )
        )
      }
      cb()
    }
  }
]