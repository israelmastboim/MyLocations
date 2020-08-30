export interface IToolbar {
    title: string;
    actions: Array<IToolbarAction>;
}

export interface IToolbarAction {
    title: string;
    link: string;
    icon: string;
}