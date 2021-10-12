import { AxiosResponse } from "axios";

export interface HTTPCustomResponse extends AxiosResponse {
    message: string
    success: boolean
    code: number
}