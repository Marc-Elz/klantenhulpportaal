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
    let payload = {
        ...updatedTicket,
    };

    // Normalize category ids Update ticket only requires a number[] not a category[]
    if (updatedTicket.category_ids) {
        const normalizedCategoryIds = updatedTicket.category_ids.map((item) => {
            if (typeof item === "object" && "id" in item) {
                return item.id;
            }
            return item;
        });

        payload = {
            ...updatedTicket,
            category_ids: normalizedCategoryIds,
        };
    }

    console.log("Payload:", payload);
    return await ticketStore.actions.update(id, payload);
};

export const deleteTicket = async (id: number) => {
    return await ticketStore.actions.delete(id);
};

export const unMountTickets = () => {
    return ticketStore.clearAll();
};
