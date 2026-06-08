import { storeModuleFactory } from "../../services/store";
import { ticketType } from "../../services/store/storeTypes";

const ticketStore = storeModuleFactory<ticketType>("tickets");

export const getAllTickets = ticketStore.getters.all;
export const getTicketById = ticketStore.getters.getById;

export const fetchTickets = async () => {
    return await ticketStore.actions.getAll();
};

export const createTicket = async (newTicket: ticketType) => {
    return await ticketStore.actions.create(newTicket);
};

export const updateTicket = async (
    id: number | string,
    updatedTicket: ticketType,
) => {
    return await ticketStore.actions.update(id, updatedTicket);
};

export const deleteTicket = async (id: number) => {
    return await ticketStore.actions.delete(id);
};
