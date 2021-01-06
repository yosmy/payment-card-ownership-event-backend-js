import React from "react";
import PropTypes from "prop-types";
import {CreditCard, Json, Text} from "@yosmy/ui";
import {Phone, PhonePlaceholder} from "@yosmy/phone";
import {EventInvolved} from "@yosmy/event";
import {enrich as phoneEnrich} from "@yosmy/phone";
import {enrich as paymentEnrich} from "@yosmy/payment-backend";
import {enrichUsers, enrichCards} from "./CommonEvent";

const type = "yosmy.payment.card.prove_ownership_success";

const ProveOwnershipSuccessEvent = ({
    ui, involved, extra, date, hide, onSelectInvolved
}) => {
    return <ui.layout
        label={<Text>El usuario verificó la tarjeta</Text>}
        involved={[
            !hide.user && <EventInvolved
                label="Usuario"
            >
                {typeof involved.user === "string"
                    ? <PhonePlaceholder/>
                    : <Phone
                        country={involved.user.country}
                        prefix={involved.user.prefix}
                        number={involved.user.number}
                        onClick={() => {
                            onSelectInvolved(
                                "user",
                                involved.user
                            );
                        }}
                    />
                }
            </EventInvolved>,
            !hide.card && <EventInvolved
                label="Tarjeta"
            >
                <CreditCard
                    last4={involved.card.last4}
                    onClick={() => {
                        onSelectInvolved(
                            "card",
                            involved.card
                        );
                    }}
                />
            </EventInvolved>
        ]}
        extra={<Json>{extra}</Json>}
        date={date}
    />
}

ProveOwnershipSuccessEvent.propTypes = {
    ui: PropTypes.shape({
        layout: PropTypes.func.isRequired
    }).isRequired,
    involved: PropTypes.shape({
        user: phoneEnrich.UserProp,
        card: paymentEnrich.CardProp,
    }).isRequired,
    hide: PropTypes.shape({
        user: PropTypes.bool,
        card: PropTypes.bool,
    }).isRequired,
    onSelectInvolved: PropTypes.func.isRequired
};

ProveOwnershipSuccessEvent.defaultProps = {
    hide: {
        user: false,
        card: false
    }
};

const enrichProveOwnershipSuccessEvent = async (events, api) => {
    events = await enrichUsers(
        events,
        api,
        type
    );

    events = await enrichCards(
        events,
        api,
        type
    );

    return events;
}

export {
    ProveOwnershipSuccessEvent,
    type as ProveOwnershipSuccessEventType,
    enrichProveOwnershipSuccessEvent,
};