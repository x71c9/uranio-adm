"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = exports.mutations = exports.state = exports.Notification = void 0;
var Notification;
(function (Notification) {
    Notification["INFO"] = "INFO";
    Notification["SUCCESS"] = "SUCCESS";
    Notification["WARN"] = "WARN";
    Notification["ERROR"] = "ERROR";
})(Notification = exports.Notification || (exports.Notification = {}));
const state = () => ({
    type: Notification.INFO,
    active: false,
    message: '',
    timer: undefined
});
exports.state = state;
// export const getters: GetterTree<RootState, RootState> = {
//   is_open: state => state.is_open,
// };
exports.mutations = {
    CHANGE_TYPE: (state, type) => (state.type = type),
    CHANGE_ACTIVE: (state, active) => (state.active = active),
    CHANGE_MESSAGE: (state, msg) => (state.message = msg.charAt(0).toUpperCase() + msg.slice(1)),
    SET_TIMER: (state, timeout_id) => (state.timer = timeout_id),
};
exports.actions = {
    show_notification(context, { type, message }) {
        context.commit('CHANGE_TYPE', type);
        context.commit('CHANGE_MESSAGE', message);
        context.commit('CHANGE_ACTIVE', true);
        clearTimeout(context.state.timer);
        context.commit('SET_TIMER', setTimeout(() => {
            context.dispatch('hide_notification');
        }, 4000));
    },
    hide_notification(context) {
        clearTimeout(context.state.timer);
        context.commit('CHANGE_ACTIVE', false);
    }
};
//# sourceMappingURL=notification.js.map