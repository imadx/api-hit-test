const serverStartDate = new Date();

export interface EventDetail {
    id?: number;
    data?: object;
}

export default class EventDetailService {
    eventDetailList: EventDetail[] = [];

    async find() {
        return {
            serverStartDate, 
            count: this.eventDetailList.length,
            events: this.eventDetailList
        };
    }

    async create(event: Pick<EventDetail, 'data'>) {
        const eventDetail: EventDetail = {
            id: +new Date(),
            data: event,
        }

        if (this.eventDetailList.length > 1000) {
            this.eventDetailList.shift();
        }

        this.eventDetailList.push(eventDetail);
        return eventDetail;
    }
}
