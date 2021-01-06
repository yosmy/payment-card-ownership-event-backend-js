import {enrich as phoneEnrich} from "@yosmy/phone";
import {enrich as paymentEnrich} from "@yosmy/payment-backend";

const enrichUsers = async (events, api, type) => {
    return await phoneEnrich.enrichUsers(
        events,
        // filter
        (event) => {
            return event.labels.includes(type);
        },
        // pick
        (event) => {
            return event.involved.user;
        },
        // collect
        async (users) => {
            return await api.collectPhones(
                users,
            );
        },
        // enrich
        (event, user) => {
            return {
                ...event,
                involved: {
                    ...event.involved,
                    user: user
                }
            }
        }
    );
};

const enrichCards = async (events, api, type) => {
    return await paymentEnrich.enrichCards(
        events,
        // filter
        (event) => {
            return event.labels.includes(type);
        },
        // pick
        (event) => {
            return event.involved.card;
        },
        // collect
        async (cards) => {
            return await api.collectCards(
                cards,
            );
        },
        // enrich
        (event, card) => {
            return {
                ...event,
                involved: {
                    ...event.involved,
                    card: card
                }
            }
        }
    );
};

const enrichCharges = async (events, api, type) => {
    return await paymentEnrich.enrichCharges(
        events,
        // filter
        (event) => {
            return event.labels.includes(type);
        },
        // pick
        (event) => {
            return event.involved.charge;
        },
        // collect
        async (charges) => {
            return await api.collectCharges(
                charges,
            );
        },
        // enrich
        (event, charge) => {
            return {
                ...event,
                involved: {
                    ...event.involved,
                    charge: charge
                }
            }
        }
    );
};

export {
    enrichUsers,
    enrichCards,
    enrichCharges
};