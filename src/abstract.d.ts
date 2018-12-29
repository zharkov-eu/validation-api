export declare abstract class AbstractValidated {
    static messages: {
        [key: string]: string;
    };
    static setMessages(messages: {
        [key: string]: string;
    }): void;
    protected constructor(entity: any);
}
