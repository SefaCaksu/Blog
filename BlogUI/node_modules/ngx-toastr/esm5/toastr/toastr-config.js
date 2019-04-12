/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * Configuration for an individual toast.
 * @record
 */
export function IndividualConfig() { }
if (false) {
    /**
     * disable both timeOut and extendedTimeOut
     * default: false
     * @type {?}
     */
    IndividualConfig.prototype.disableTimeOut;
    /**
     * toast time to live in milliseconds
     * default: 5000
     * @type {?}
     */
    IndividualConfig.prototype.timeOut;
    /**
     * toast show close button
     * default: false
     * @type {?}
     */
    IndividualConfig.prototype.closeButton;
    /**
     * time to close after a user hovers over toast
     * default: 1000
     * @type {?}
     */
    IndividualConfig.prototype.extendedTimeOut;
    /**
     * show toast progress bar
     * default: false
     * @type {?}
     */
    IndividualConfig.prototype.progressBar;
    /**
     * changes toast progress bar animation
     * default: decreasing
     * @type {?}
     */
    IndividualConfig.prototype.progressAnimation;
    /**
     * render html in toast message (possibly unsafe)
     * default: false
     * @type {?}
     */
    IndividualConfig.prototype.enableHtml;
    /**
     * css class on toast component
     * default: toast
     * @type {?}
     */
    IndividualConfig.prototype.toastClass;
    /**
     * css class on toast container
     * default: toast-top-right
     * @type {?}
     */
    IndividualConfig.prototype.positionClass;
    /**
     * css class on toast title
     * default: toast-title
     * @type {?}
     */
    IndividualConfig.prototype.titleClass;
    /**
     * css class on toast message
     * default: toast-message
     * @type {?}
     */
    IndividualConfig.prototype.messageClass;
    /**
     * animation easing on toast
     * default: ease-in
     * @type {?}
     */
    IndividualConfig.prototype.easing;
    /**
     * animation ease time on toast
     * default: 300
     * @type {?}
     */
    IndividualConfig.prototype.easeTime;
    /**
     * clicking on toast dismisses it
     * default: true
     * @type {?}
     */
    IndividualConfig.prototype.tapToDismiss;
    /**
     * Angular toast component to be shown
     * default: Toast
     * @type {?|undefined}
     */
    IndividualConfig.prototype.toastComponent;
    /**
     * Helps show toast from a websocket or from event outside Angular
     * default: false
     * @type {?}
     */
    IndividualConfig.prototype.onActivateTick;
}
/**
 * @record
 */
export function ToastrIconClasses() { }
if (false) {
    /** @type {?} */
    ToastrIconClasses.prototype.error;
    /** @type {?} */
    ToastrIconClasses.prototype.info;
    /** @type {?} */
    ToastrIconClasses.prototype.success;
    /** @type {?} */
    ToastrIconClasses.prototype.warning;
}
/**
 * Global Toast configuration
 * Includes all IndividualConfig
 * @record
 */
export function GlobalConfig() { }
if (false) {
    /**
     * max toasts opened. Toasts will be queued
     * Zero is unlimited
     * default: 0
     * @type {?}
     */
    GlobalConfig.prototype.maxOpened;
    /**
     * dismiss current toast when max is reached
     * default: false
     * @type {?}
     */
    GlobalConfig.prototype.autoDismiss;
    /** @type {?} */
    GlobalConfig.prototype.iconClasses;
    /**
     * New toast placement
     * default: true
     * @type {?}
     */
    GlobalConfig.prototype.newestOnTop;
    /**
     * block duplicate messages
     * default: false
     * @type {?}
     */
    GlobalConfig.prototype.preventDuplicates;
    /**
     * display the number of duplicate messages
     * default: false
     * @type {?}
     */
    GlobalConfig.prototype.countDuplicates;
    /**
     * Reset toast timeout when there's a duplicate (preventDuplicates needs to be set to true)
     * default: false
     * @type {?}
     */
    GlobalConfig.prototype.resetTimeoutOnDuplicate;
}
/**
 * Everything a toast needs to launch
 */
var /**
 * Everything a toast needs to launch
 */
ToastPackage = /** @class */ (function () {
    function ToastPackage(toastId, config, message, title, toastType, toastRef) {
        var _this = this;
        this.toastId = toastId;
        this.config = config;
        this.message = message;
        this.title = title;
        this.toastType = toastType;
        this.toastRef = toastRef;
        this._onTap = new Subject();
        this._onAction = new Subject();
        this.toastRef.afterClosed().subscribe((/**
         * @return {?}
         */
        function () {
            _this._onAction.complete();
            _this._onTap.complete();
        }));
    }
    /** Fired on click */
    /**
     * Fired on click
     * @return {?}
     */
    ToastPackage.prototype.triggerTap = /**
     * Fired on click
     * @return {?}
     */
    function () {
        this._onTap.next();
        if (this.config.tapToDismiss) {
            this._onTap.complete();
        }
    };
    /**
     * @return {?}
     */
    ToastPackage.prototype.onTap = /**
     * @return {?}
     */
    function () {
        return this._onTap.asObservable();
    };
    /** available for use in custom toast */
    /**
     * available for use in custom toast
     * @param {?=} action
     * @return {?}
     */
    ToastPackage.prototype.triggerAction = /**
     * available for use in custom toast
     * @param {?=} action
     * @return {?}
     */
    function (action) {
        this._onAction.next(action);
    };
    /**
     * @return {?}
     */
    ToastPackage.prototype.onAction = /**
     * @return {?}
     */
    function () {
        return this._onAction.asObservable();
    };
    return ToastPackage;
}());
/**
 * Everything a toast needs to launch
 */
export { ToastPackage };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ToastPackage.prototype._onTap;
    /**
     * @type {?}
     * @private
     */
    ToastPackage.prototype._onAction;
    /** @type {?} */
    ToastPackage.prototype.toastId;
    /** @type {?} */
    ToastPackage.prototype.config;
    /** @type {?} */
    ToastPackage.prototype.message;
    /** @type {?} */
    ToastPackage.prototype.title;
    /** @type {?} */
    ToastPackage.prototype.toastType;
    /** @type {?} */
    ToastPackage.prototype.toastRef;
}
/**
 * @deprecated use GlobalConfig
 * @record
 */
export function GlobalToastrConfig() { }
/**
 * @deprecated use IndividualConfig
 * @record
 */
export function IndividualToastrConfig() { }
/**
 * @deprecated use IndividualConfig
 * @record
 */
export function ToastrConfig() { }
/** @type {?} */
export var DefaultNoComponentGlobalConfig = {
    maxOpened: 0,
    autoDismiss: false,
    newestOnTop: true,
    preventDuplicates: false,
    countDuplicates: false,
    resetTimeoutOnDuplicate: false,
    iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning',
    },
    // Individual
    closeButton: false,
    disableTimeOut: false,
    timeOut: 5000,
    extendedTimeOut: 1000,
    enableHtml: false,
    progressBar: false,
    toastClass: 'ngx-toastr',
    positionClass: 'toast-top-right',
    titleClass: 'toast-title',
    messageClass: 'toast-message',
    easing: 'ease-in',
    easeTime: 300,
    tapToDismiss: true,
    onActivateTick: false,
    progressAnimation: 'decreasing',
};
/**
 * @record
 */
export function ToastToken() { }
if (false) {
    /** @type {?} */
    ToastToken.prototype.default;
    /** @type {?} */
    ToastToken.prototype.config;
}
/** @type {?} */
export var TOAST_CONFIG = new InjectionToken('ToastConfig');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3RyLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC10b2FzdHIvIiwic291cmNlcyI6WyJ0b2FzdHIvdG9hc3RyLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUcvQyxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQVUzQyxzQ0FtRkM7Ozs7Ozs7SUE5RUMsMENBQXdCOzs7Ozs7SUFLeEIsbUNBQWdCOzs7Ozs7SUFLaEIsdUNBQXFCOzs7Ozs7SUFLckIsMkNBQXdCOzs7Ozs7SUFLeEIsdUNBQXFCOzs7Ozs7SUFNckIsNkNBQXlDOzs7Ozs7SUFNekMsc0NBQW9COzs7Ozs7SUFLcEIsc0NBQW1COzs7Ozs7SUFLbkIseUNBQXNCOzs7Ozs7SUFLdEIsc0NBQW1COzs7Ozs7SUFLbkIsd0NBQXFCOzs7Ozs7SUFLckIsa0NBQWU7Ozs7OztJQUtmLG9DQUEwQjs7Ozs7O0lBSzFCLHdDQUFzQjs7Ozs7O0lBS3RCLDBDQUFvQzs7Ozs7O0lBS3BDLDBDQUF3Qjs7Ozs7QUFHMUIsdUNBS0M7OztJQUpDLGtDQUFjOztJQUNkLGlDQUFhOztJQUNiLG9DQUFnQjs7SUFDaEIsb0NBQWdCOzs7Ozs7O0FBT2xCLGtDQWlDQzs7Ozs7Ozs7SUEzQkMsaUNBQWtCOzs7Ozs7SUFLbEIsbUNBQXFCOztJQUNyQixtQ0FBd0M7Ozs7OztJQUt4QyxtQ0FBcUI7Ozs7OztJQUtyQix5Q0FBMkI7Ozs7OztJQUszQix1Q0FBeUI7Ozs7OztJQUt6QiwrQ0FBaUM7Ozs7O0FBTW5DOzs7O0lBSUUsc0JBQ1MsT0FBZSxFQUNmLE1BQXdCLEVBQ3hCLE9BQTZDLEVBQzdDLEtBQXlCLEVBQ3pCLFNBQWlCLEVBQ2pCLFFBQXVCO1FBTmhDLGlCQVlDO1FBWFEsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLFlBQU8sR0FBUCxPQUFPLENBQXNDO1FBQzdDLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQ3pCLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDakIsYUFBUSxHQUFSLFFBQVEsQ0FBZTtRQVR4QixXQUFNLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUM1QixjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQVVyQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVM7OztRQUFDO1lBQ3BDLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDMUIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN6QixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxxQkFBcUI7Ozs7O0lBQ3JCLGlDQUFVOzs7O0lBQVY7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUN4QjtJQUNILENBQUM7Ozs7SUFFRCw0QkFBSzs7O0lBQUw7UUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELHdDQUF3Qzs7Ozs7O0lBQ3hDLG9DQUFhOzs7OztJQUFiLFVBQWMsTUFBWTtRQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsK0JBQVE7OztJQUFSO1FBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUF0Q0QsSUFzQ0M7Ozs7Ozs7Ozs7SUFyQ0MsOEJBQW9DOzs7OztJQUNwQyxpQ0FBdUM7O0lBR3JDLCtCQUFzQjs7SUFDdEIsOEJBQStCOztJQUMvQiwrQkFBb0Q7O0lBQ3BELDZCQUFnQzs7SUFDaEMsaUNBQXdCOztJQUN4QixnQ0FBOEI7Ozs7OztBQWdDbEMsd0NBQTJEOzs7OztBQUUzRCw0Q0FBbUU7Ozs7O0FBRW5FLGtDQUF5RDs7QUFFekQsTUFBTSxLQUFPLDhCQUE4QixHQUFpQjtJQUMxRCxTQUFTLEVBQUUsQ0FBQztJQUNaLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLGlCQUFpQixFQUFFLEtBQUs7SUFDeEIsZUFBZSxFQUFFLEtBQUs7SUFDdEIsdUJBQXVCLEVBQUUsS0FBSztJQUM5QixXQUFXLEVBQUU7UUFDWCxLQUFLLEVBQUUsYUFBYTtRQUNwQixJQUFJLEVBQUUsWUFBWTtRQUNsQixPQUFPLEVBQUUsZUFBZTtRQUN4QixPQUFPLEVBQUUsZUFBZTtLQUN6Qjs7SUFHRCxXQUFXLEVBQUUsS0FBSztJQUNsQixjQUFjLEVBQUUsS0FBSztJQUNyQixPQUFPLEVBQUUsSUFBSTtJQUNiLGVBQWUsRUFBRSxJQUFJO0lBQ3JCLFVBQVUsRUFBRSxLQUFLO0lBQ2pCLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLFVBQVUsRUFBRSxZQUFZO0lBQ3hCLGFBQWEsRUFBRSxpQkFBaUI7SUFDaEMsVUFBVSxFQUFFLGFBQWE7SUFDekIsWUFBWSxFQUFFLGVBQWU7SUFDN0IsTUFBTSxFQUFFLFNBQVM7SUFDakIsUUFBUSxFQUFFLEdBQUc7SUFDYixZQUFZLEVBQUUsSUFBSTtJQUNsQixjQUFjLEVBQUUsS0FBSztJQUNyQixpQkFBaUIsRUFBRSxZQUFZO0NBQ2hDOzs7O0FBRUQsZ0NBR0M7OztJQUZDLDZCQUFzQjs7SUFDdEIsNEJBQThCOzs7QUFHaEMsTUFBTSxLQUFPLFlBQVksR0FBRyxJQUFJLGNBQWMsQ0FBYSxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2FmZUh0bWwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBDb21wb25lbnRUeXBlIH0gZnJvbSAnLi4vcG9ydGFsL3BvcnRhbCc7XG5pbXBvcnQgeyBUb2FzdFJlZiB9IGZyb20gJy4vdG9hc3QtaW5qZWN0b3InO1xuXG5leHBvcnQgdHlwZSBQcm9ncmVzc0FuaW1hdGlvblR5cGUgPSAnaW5jcmVhc2luZycgfCAnZGVjcmVhc2luZyc7XG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3IgYW4gaW5kaXZpZHVhbCB0b2FzdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBJbmRpdmlkdWFsQ29uZmlnIHtcbiAgLyoqXG4gICAqIGRpc2FibGUgYm90aCB0aW1lT3V0IGFuZCBleHRlbmRlZFRpbWVPdXRcbiAgICogZGVmYXVsdDogZmFsc2VcbiAgICovXG4gIGRpc2FibGVUaW1lT3V0OiBib29sZWFuO1xuICAvKipcbiAgICogdG9hc3QgdGltZSB0byBsaXZlIGluIG1pbGxpc2Vjb25kc1xuICAgKiBkZWZhdWx0OiA1MDAwXG4gICAqL1xuICB0aW1lT3V0OiBudW1iZXI7XG4gIC8qKlxuICAgKiB0b2FzdCBzaG93IGNsb3NlIGJ1dHRvblxuICAgKiBkZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgY2xvc2VCdXR0b246IGJvb2xlYW47XG4gIC8qKlxuICAgKiB0aW1lIHRvIGNsb3NlIGFmdGVyIGEgdXNlciBob3ZlcnMgb3ZlciB0b2FzdFxuICAgKiBkZWZhdWx0OiAxMDAwXG4gICAqL1xuICBleHRlbmRlZFRpbWVPdXQ6IG51bWJlcjtcbiAgLyoqXG4gICAqIHNob3cgdG9hc3QgcHJvZ3Jlc3MgYmFyXG4gICAqIGRlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICBwcm9ncmVzc0JhcjogYm9vbGVhbjtcblxuICAvKipcbiAgICogY2hhbmdlcyB0b2FzdCBwcm9ncmVzcyBiYXIgYW5pbWF0aW9uXG4gICAqIGRlZmF1bHQ6IGRlY3JlYXNpbmdcbiAgICovXG4gIHByb2dyZXNzQW5pbWF0aW9uOiBQcm9ncmVzc0FuaW1hdGlvblR5cGU7XG5cbiAgLyoqXG4gICAqIHJlbmRlciBodG1sIGluIHRvYXN0IG1lc3NhZ2UgKHBvc3NpYmx5IHVuc2FmZSlcbiAgICogZGVmYXVsdDogZmFsc2VcbiAgICovXG4gIGVuYWJsZUh0bWw6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBjc3MgY2xhc3Mgb24gdG9hc3QgY29tcG9uZW50XG4gICAqIGRlZmF1bHQ6IHRvYXN0XG4gICAqL1xuICB0b2FzdENsYXNzOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBjc3MgY2xhc3Mgb24gdG9hc3QgY29udGFpbmVyXG4gICAqIGRlZmF1bHQ6IHRvYXN0LXRvcC1yaWdodFxuICAgKi9cbiAgcG9zaXRpb25DbGFzczogc3RyaW5nO1xuICAvKipcbiAgICogY3NzIGNsYXNzIG9uIHRvYXN0IHRpdGxlXG4gICAqIGRlZmF1bHQ6IHRvYXN0LXRpdGxlXG4gICAqL1xuICB0aXRsZUNsYXNzOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBjc3MgY2xhc3Mgb24gdG9hc3QgbWVzc2FnZVxuICAgKiBkZWZhdWx0OiB0b2FzdC1tZXNzYWdlXG4gICAqL1xuICBtZXNzYWdlQ2xhc3M6IHN0cmluZztcbiAgLyoqXG4gICAqIGFuaW1hdGlvbiBlYXNpbmcgb24gdG9hc3RcbiAgICogZGVmYXVsdDogZWFzZS1pblxuICAgKi9cbiAgZWFzaW5nOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBhbmltYXRpb24gZWFzZSB0aW1lIG9uIHRvYXN0XG4gICAqIGRlZmF1bHQ6IDMwMFxuICAgKi9cbiAgZWFzZVRpbWU6IHN0cmluZyB8IG51bWJlcjtcbiAgLyoqXG4gICAqIGNsaWNraW5nIG9uIHRvYXN0IGRpc21pc3NlcyBpdFxuICAgKiBkZWZhdWx0OiB0cnVlXG4gICAqL1xuICB0YXBUb0Rpc21pc3M6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBBbmd1bGFyIHRvYXN0IGNvbXBvbmVudCB0byBiZSBzaG93blxuICAgKiBkZWZhdWx0OiBUb2FzdFxuICAgKi9cbiAgdG9hc3RDb21wb25lbnQ/OiBDb21wb25lbnRUeXBlPGFueT47XG4gIC8qKlxuICAgKiBIZWxwcyBzaG93IHRvYXN0IGZyb20gYSB3ZWJzb2NrZXQgb3IgZnJvbSBldmVudCBvdXRzaWRlIEFuZ3VsYXJcbiAgICogZGVmYXVsdDogZmFsc2VcbiAgICovXG4gIG9uQWN0aXZhdGVUaWNrOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRvYXN0ckljb25DbGFzc2VzIHtcbiAgZXJyb3I6IHN0cmluZztcbiAgaW5mbzogc3RyaW5nO1xuICBzdWNjZXNzOiBzdHJpbmc7XG4gIHdhcm5pbmc6IHN0cmluZztcbn1cblxuLyoqXG4gKiBHbG9iYWwgVG9hc3QgY29uZmlndXJhdGlvblxuICogSW5jbHVkZXMgYWxsIEluZGl2aWR1YWxDb25maWdcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBHbG9iYWxDb25maWcgZXh0ZW5kcyBJbmRpdmlkdWFsQ29uZmlnIHtcbiAgLyoqXG4gICAqIG1heCB0b2FzdHMgb3BlbmVkLiBUb2FzdHMgd2lsbCBiZSBxdWV1ZWRcbiAgICogWmVybyBpcyB1bmxpbWl0ZWRcbiAgICogZGVmYXVsdDogMFxuICAgKi9cbiAgbWF4T3BlbmVkOiBudW1iZXI7XG4gIC8qKlxuICAgKiBkaXNtaXNzIGN1cnJlbnQgdG9hc3Qgd2hlbiBtYXggaXMgcmVhY2hlZFxuICAgKiBkZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgYXV0b0Rpc21pc3M6IGJvb2xlYW47XG4gIGljb25DbGFzc2VzOiBQYXJ0aWFsPFRvYXN0ckljb25DbGFzc2VzPjtcbiAgLyoqXG4gICAqIE5ldyB0b2FzdCBwbGFjZW1lbnRcbiAgICogZGVmYXVsdDogdHJ1ZVxuICAgKi9cbiAgbmV3ZXN0T25Ub3A6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBibG9jayBkdXBsaWNhdGUgbWVzc2FnZXNcbiAgICogZGVmYXVsdDogZmFsc2VcbiAgICovXG4gIHByZXZlbnREdXBsaWNhdGVzOiBib29sZWFuO1xuICAvKipcbiAgICogZGlzcGxheSB0aGUgbnVtYmVyIG9mIGR1cGxpY2F0ZSBtZXNzYWdlc1xuICAgKiBkZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgY291bnREdXBsaWNhdGVzOiBib29sZWFuO1xuICAvKipcbiAgICogUmVzZXQgdG9hc3QgdGltZW91dCB3aGVuIHRoZXJlJ3MgYSBkdXBsaWNhdGUgKHByZXZlbnREdXBsaWNhdGVzIG5lZWRzIHRvIGJlIHNldCB0byB0cnVlKVxuICAgKiBkZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgcmVzZXRUaW1lb3V0T25EdXBsaWNhdGU6IGJvb2xlYW47XG59XG5cbi8qKlxuICogRXZlcnl0aGluZyBhIHRvYXN0IG5lZWRzIHRvIGxhdW5jaFxuICovXG5leHBvcnQgY2xhc3MgVG9hc3RQYWNrYWdlIHtcbiAgcHJpdmF0ZSBfb25UYXAgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gIHByaXZhdGUgX29uQWN0aW9uID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyB0b2FzdElkOiBudW1iZXIsXG4gICAgcHVibGljIGNvbmZpZzogSW5kaXZpZHVhbENvbmZpZyxcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nIHwgU2FmZUh0bWwgfCBudWxsIHwgdW5kZWZpbmVkLFxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHB1YmxpYyB0b2FzdFR5cGU6IHN0cmluZyxcbiAgICBwdWJsaWMgdG9hc3RSZWY6IFRvYXN0UmVmPGFueT4sXG4gICkge1xuICAgIHRoaXMudG9hc3RSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5fb25BY3Rpb24uY29tcGxldGUoKTtcbiAgICAgIHRoaXMuX29uVGFwLmNvbXBsZXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogRmlyZWQgb24gY2xpY2sgKi9cbiAgdHJpZ2dlclRhcCgpIHtcbiAgICB0aGlzLl9vblRhcC5uZXh0KCk7XG4gICAgaWYgKHRoaXMuY29uZmlnLnRhcFRvRGlzbWlzcykge1xuICAgICAgdGhpcy5fb25UYXAuY29tcGxldGUoKTtcbiAgICB9XG4gIH1cblxuICBvblRhcCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9vblRhcC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKiBhdmFpbGFibGUgZm9yIHVzZSBpbiBjdXN0b20gdG9hc3QgKi9cbiAgdHJpZ2dlckFjdGlvbihhY3Rpb24/OiBhbnkpIHtcbiAgICB0aGlzLl9vbkFjdGlvbi5uZXh0KGFjdGlvbik7XG4gIH1cblxuICBvbkFjdGlvbigpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9vbkFjdGlvbi5hc09ic2VydmFibGUoKTtcbiAgfVxufVxuXG4vKiB0c2xpbnQ6ZGlzYWJsZTpuby1lbXB0eS1pbnRlcmZhY2UgKi9cbi8qKiBAZGVwcmVjYXRlZCB1c2UgR2xvYmFsQ29uZmlnICovXG5leHBvcnQgaW50ZXJmYWNlIEdsb2JhbFRvYXN0ckNvbmZpZyBleHRlbmRzIEdsb2JhbENvbmZpZyB7fVxuLyoqIEBkZXByZWNhdGVkIHVzZSBJbmRpdmlkdWFsQ29uZmlnICovXG5leHBvcnQgaW50ZXJmYWNlIEluZGl2aWR1YWxUb2FzdHJDb25maWcgZXh0ZW5kcyBJbmRpdmlkdWFsQ29uZmlnIHt9XG4vKiogQGRlcHJlY2F0ZWQgdXNlIEluZGl2aWR1YWxDb25maWcgKi9cbmV4cG9ydCBpbnRlcmZhY2UgVG9hc3RyQ29uZmlnIGV4dGVuZHMgSW5kaXZpZHVhbENvbmZpZyB7fVxuXG5leHBvcnQgY29uc3QgRGVmYXVsdE5vQ29tcG9uZW50R2xvYmFsQ29uZmlnOiBHbG9iYWxDb25maWcgPSB7XG4gIG1heE9wZW5lZDogMCxcbiAgYXV0b0Rpc21pc3M6IGZhbHNlLFxuICBuZXdlc3RPblRvcDogdHJ1ZSxcbiAgcHJldmVudER1cGxpY2F0ZXM6IGZhbHNlLFxuICBjb3VudER1cGxpY2F0ZXM6IGZhbHNlLFxuICByZXNldFRpbWVvdXRPbkR1cGxpY2F0ZTogZmFsc2UsXG4gIGljb25DbGFzc2VzOiB7XG4gICAgZXJyb3I6ICd0b2FzdC1lcnJvcicsXG4gICAgaW5mbzogJ3RvYXN0LWluZm8nLFxuICAgIHN1Y2Nlc3M6ICd0b2FzdC1zdWNjZXNzJyxcbiAgICB3YXJuaW5nOiAndG9hc3Qtd2FybmluZycsXG4gIH0sXG5cbiAgLy8gSW5kaXZpZHVhbFxuICBjbG9zZUJ1dHRvbjogZmFsc2UsXG4gIGRpc2FibGVUaW1lT3V0OiBmYWxzZSxcbiAgdGltZU91dDogNTAwMCxcbiAgZXh0ZW5kZWRUaW1lT3V0OiAxMDAwLFxuICBlbmFibGVIdG1sOiBmYWxzZSxcbiAgcHJvZ3Jlc3NCYXI6IGZhbHNlLFxuICB0b2FzdENsYXNzOiAnbmd4LXRvYXN0cicsXG4gIHBvc2l0aW9uQ2xhc3M6ICd0b2FzdC10b3AtcmlnaHQnLFxuICB0aXRsZUNsYXNzOiAndG9hc3QtdGl0bGUnLFxuICBtZXNzYWdlQ2xhc3M6ICd0b2FzdC1tZXNzYWdlJyxcbiAgZWFzaW5nOiAnZWFzZS1pbicsXG4gIGVhc2VUaW1lOiAzMDAsXG4gIHRhcFRvRGlzbWlzczogdHJ1ZSxcbiAgb25BY3RpdmF0ZVRpY2s6IGZhbHNlLFxuICBwcm9ncmVzc0FuaW1hdGlvbjogJ2RlY3JlYXNpbmcnLFxufTtcblxuZXhwb3J0IGludGVyZmFjZSBUb2FzdFRva2VuIHtcbiAgZGVmYXVsdDogR2xvYmFsQ29uZmlnO1xuICBjb25maWc6IFBhcnRpYWw8R2xvYmFsQ29uZmlnPjtcbn1cblxuZXhwb3J0IGNvbnN0IFRPQVNUX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxUb2FzdFRva2VuPignVG9hc3RDb25maWcnKTtcbiJdfQ==