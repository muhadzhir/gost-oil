import { ref } from "vue";
import {Client, ClientModel} from "@/models/ClientModel.ts";

const numbers = ref<number[]>([])
const client = ref<ClientModel>(new ClientModel({} as Client))
const setNumbers = (nums: number[]) => {
    numbers.value = nums
}
export  {
    numbers,
    setNumbers,
    client
}
