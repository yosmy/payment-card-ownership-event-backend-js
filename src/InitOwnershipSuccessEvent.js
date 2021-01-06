import React from "react";
import PropTypes from "prop-types";
import {CreditCard, Json, Text} from "@yosmy/ui";
import {Phone, PhonePlaceholder} from "@yosmy/phone";
import Money from "@yosmy/money";
import {EventInvolved} from "@yosmy/event";
import {enrich as phoneEnrich} from "@yosmy/phone";
import {enrich as paymentEnrich} from "@yosmy/payment-backend";
import {enrichUsers, enrichCards, enrichCharges} from "./CommonEvent";

const type = "yosmy.payment.card.init_ownership_success";

const InitOwnershipSuccessEvent = ({
    ui, involved, extra, date, hide, onSelectInvolved
}) => {
    return <ui.layout
        label={<Text>Se le cobró al usuario para la verificación</Text>}
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
            </EventInvolved>,
            !hide.charge && <EventInvolved
                label="Cobro"
            >
                <Text>
                    {involved.charge.amount && Money.format(involved.charge.amount)}
                </Text>
            </EventInvolved>
        ]}
        extra={<Json>{extra}</Json>}
        date={date}
    />
}

InitOwnershipSuccessEvent.propTypes = {
    ui: PropTypes.shape({
        layout: PropTypes.func.isRequired
    }).isRequired,
    involved: PropTypes.shape({
        user: phoneEnrich.UserProp,
        card: paymentEnrich.CardProp,
        charge: paymentEnrich.ChargeProp,
    }).isRequired,
    hide: PropTypes.shape({
        user: PropTypes.bool,
        card: PropTypes.bool,
        charge: PropTypes.bool,
    }).isRequired,
    onSelectInvolved: PropTypes.func.isRequired
};

InitOwnershipSuccessEvent.defaultProps = {
    hide: {
        user: false,
        card: false,
        charge: false
    }
};

const enrichInitOwnershipSuccessEvent = async (events, api) => {
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

    events = await enrichCharges(
        events,
        api,
        type
    );

    return events;
}

export {
    InitOwnershipSuccessEvent,
    type as InitOwnershipSuccessEventType,
    enrichInitOwnershipSuccessEvent,
};