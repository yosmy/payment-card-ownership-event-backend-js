import React from "react";
import PropTypes from "prop-types";
import {ListEvents as BaseListEvents, FallbackEvent, EventLayout} from "@yosmy/event";
import enrich from "./enrich";
import resolve from "./resolve";

const ListEvents = ({
    ui, api, criteria, onSelectUser
}) => {
    return <BaseListEvents
        ui={{
            layout: ui.layout,
            item: ({labels, involved, extra, date}) => {
                const Component = resolve(
                    labels,
                ) || FallbackEvent;

                return <Component
                    ui={{
                        layout: EventLayout
                    }}
                    labels={labels}
                    involved={involved}
                    extra={extra}
                    date={date}
                    onSelectInvolved={(type, value) => {
                        if (type !== "user") {
                            return;
                        }

                        onSelectUser(value.id);
                    }}
                />
            }
        }}
        criteria={{
            query: criteria.query,
            limit: criteria.limit
        }}
        onCollect={async (query, skip, limit) => {
            const events = await api.collectEvents(
                [
                    "yosmy.payment.card.init_ownership_success",
                    "yosmy.payment.card.init_ownership_fail",
                    "yosmy.payment.card.prove_ownership_success",
                    "yosmy.payment.card.prove_ownership_fail",
                    "yosmy.payment.card.approve_ownership_success",
                    "yosmy.payment.card.expire_ownership_success"
                ],
                {
                    user: query.user
                },
                null,
                query.from,
                query.to,
                skip,
                limit
            );

            if (events.length === 0) {
                return {
                    items: events,
                };
            }

            return {
                items: events,
                onEnrich: async (events) => {
                    events = await enrich(
                        events,
                        {
                            collectPhones: api.collectPhones,
                            collectCards: api.collectCards,
                            collectCharges: api.collectCharges
                        }
                    );

                    return events;
                }
            };
        }}
    />
};

ListEvents.propTypes = {
    ui: PropTypes.shape({
        layout: PropTypes.func.isRequired,
    }).isRequired,
    api: PropTypes.shape({
        collectEvents: PropTypes.func.isRequired,
        collectPhones: PropTypes.func.isRequired,
        collectCards: PropTypes.func.isRequired,
        collectCharges: PropTypes.func.isRequired,
    }).isRequired,
    criteria: PropTypes.shape({
        query: PropTypes.shape({
            user: PropTypes.string,
            from: PropTypes.number,
            to: PropTypes.number,
        }).isRequired,
        limit: PropTypes.number.isRequired,
    }).isRequired,
    onSelectUser: PropTypes.func.isRequired // (id)
};

export default ListEvents;