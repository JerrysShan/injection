import { Config } from '../../../src'

export class Dog {
    @Config('name.firstName')
    // @ts-ignore
    public name: string;
    constructor(
        @Config('id')
        public id: number,
    ) { }
}