/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { ToastPackage } from './toastr-config';
/**
 * Reference to a toast opened via the Toastr service.
 * @template T
 */
var /**
 * Reference to a toast opened via the Toastr service.
 * @template T
 */
ToastRef = /** @class */ (function () {
    function ToastRef(_overlayRef) {
        this._overlayRef = _overlayRef;
        /**
         * Count of duplicates of this toast
         */
        this.duplicatesCount = 0;
        /**
         * Subject for notifying the user that the toast has finished closing.
         */
        this._afterClosed = new Subject();
        /**
         * triggered when toast is activated
         */
        this._activate = new Subject();
        /**
         * notifies the toast that it should close before the timeout
         */
        this._manualClose = new Subject();
        /**
         * notifies the toast that it should reset the timeouts
         */
        this._resetTimeout = new Subject();
        /**
         * notifies the toast that it should count a duplicate toast
         */
        this._countDuplicate = new Subject();
    }
    /**
     * @return {?}
     */
    ToastRef.prototype.manualClose = /**
     * @return {?}
     */
    function () {
        this._manualClose.next();
        this._manualClose.complete();
    };
    /**
     * @return {?}
     */
    ToastRef.prototype.manualClosed = /**
     * @return {?}
     */
    function () {
        return this._manualClose.asObservable();
    };
    /**
     * @return {?}
     */
    ToastRef.prototype.timeoutReset = /**
     * @return {?}
     */
    function () {
        return this._resetTimeout.asObservable();
    };
    /**
     * @return {?}
     */
    ToastRef.prototype.countDuplicate = /**
     * @return {?}
     */
    function () {
        return this._countDuplicate.asObservable();
    };
    /**
     * Close the toast.
     */
    /**
     * Close the toast.
     * @return {?}
     */
    ToastRef.prototype.close = /**
     * Close the toast.
     * @return {?}
     */
    function () {
        this._overlayRef.detach();
        this._afterClosed.next();
        this._manualClose.next();
        this._afterClosed.complete();
        this._manualClose.complete();
        this._activate.complete();
        this._resetTimeout.complete();
        this._countDuplicate.complete();
    };
    /** Gets an observable that is notified when the toast is finished closing. */
    /**
     * Gets an observable that is notified when the toast is finished closing.
     * @return {?}
     */
    ToastRef.prototype.afterClosed = /**
     * Gets an observable that is notified when the toast is finished closing.
     * @return {?}
     */
    function () {
        return this._afterClosed.asObservable();
    };
    /**
     * @return {?}
     */
    ToastRef.prototype.isInactive = /**
     * @return {?}
     */
    function () {
        return this._activate.isStopped;
    };
    /**
     * @return {?}
     */
    ToastRef.prototype.activate = /**
     * @return {?}
     */
    function () {
        this._activate.next();
        this._activate.complete();
    };
    /** Gets an observable that is notified when the toast has started opening. */
    /**
     * Gets an observable that is notified when the toast has started opening.
     * @return {?}
     */
    ToastRef.prototype.afterActivate = /**
     * Gets an observable that is notified when the toast has started opening.
     * @return {?}
     */
    function () {
        return this._activate.asObservable();
    };
    /** Reset the toast timouts and count duplicates */
    /**
     * Reset the toast timouts and count duplicates
     * @param {?} resetTimeout
     * @param {?} countDuplicate
     * @return {?}
     */
    ToastRef.prototype.onDuplicate = /**
     * Reset the toast timouts and count duplicates
     * @param {?} resetTimeout
     * @param {?} countDuplicate
     * @return {?}
     */
    function (resetTimeout, countDuplicate) {
        if (resetTimeout) {
            this._resetTimeout.next();
        }
        if (countDuplicate) {
            this._countDuplicate.next(++this.duplicatesCount);
        }
    };
    return ToastRef;
}());
/**
 * Reference to a toast opened via the Toastr service.
 * @template T
 */
export { ToastRef };
if (false) {
    /**
     * The instance of component opened into the toast.
     * @type {?}
     */
    ToastRef.prototype.componentInstance;
    /**
     * Count of duplicates of this toast
     * @type {?}
     * @private
     */
    ToastRef.prototype.duplicatesCount;
    /**
     * Subject for notifying the user that the toast has finished closing.
     * @type {?}
     * @private
     */
    ToastRef.prototype._afterClosed;
    /**
     * triggered when toast is activated
     * @type {?}
     * @private
     */
    ToastRef.prototype._activate;
    /**
     * notifies the toast that it should close before the timeout
     * @type {?}
     * @private
     */
    ToastRef.prototype._manualClose;
    /**
     * notifies the toast that it should reset the timeouts
     * @type {?}
     * @private
     */
    ToastRef.prototype._resetTimeout;
    /**
     * notifies the toast that it should count a duplicate toast
     * @type {?}
     * @private
     */
    ToastRef.prototype._countDuplicate;
    /**
     * @type {?}
     * @private
     */
    ToastRef.prototype._overlayRef;
}
/**
 * Custom injector type specifically for instantiating components with a toast.
 */
var /**
 * Custom injector type specifically for instantiating components with a toast.
 */
ToastInjector = /** @class */ (function () {
    function ToastInjector(_toastPackage, _parentInjector) {
        this._toastPackage = _toastPackage;
        this._parentInjector = _parentInjector;
    }
    /**
     * @template T
     * @param {?} token
     * @param {?=} notFoundValue
     * @param {?=} flags
     * @return {?}
     */
    ToastInjector.prototype.get = /**
     * @template T
     * @param {?} token
     * @param {?=} notFoundValue
     * @param {?=} flags
     * @return {?}
     */
    function (token, notFoundValue, flags) {
        if (token === ToastPackage) {
            return this._toastPackage;
        }
        return this._parentInjector.get(token, notFoundValue, flags);
    };
    return ToastInjector;
}());
/**
 * Custom injector type specifically for instantiating components with a toast.
 */
export { ToastInjector };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ToastInjector.prototype._toastPackage;
    /**
     * @type {?}
     * @private
     */
    ToastInjector.prototype._parentInjector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QtaW5qZWN0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdG9hc3RyLyIsInNvdXJjZXMiOlsidG9hc3RyL3RvYXN0LWluamVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7QUFLL0M7Ozs7O0lBa0JFLGtCQUFvQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTs7OztRQWJuQyxvQkFBZSxHQUFHLENBQUMsQ0FBQzs7OztRQUdwQixpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7Ozs7UUFFbEMsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7Ozs7UUFFL0IsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDOzs7O1FBRWxDLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQzs7OztRQUVuQyxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7SUFFRixDQUFDOzs7O0lBRS9DLDhCQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMvQixDQUFDOzs7O0lBRUQsK0JBQVk7OztJQUFaO1FBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFDLENBQUM7Ozs7SUFFRCwrQkFBWTs7O0lBQVo7UUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQzs7OztJQUVELGlDQUFjOzs7SUFBZDtRQUNFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsd0JBQUs7Ozs7SUFBTDtRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsOEVBQThFOzs7OztJQUM5RSw4QkFBVzs7OztJQUFYO1FBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFDLENBQUM7Ozs7SUFFRCw2QkFBVTs7O0lBQVY7UUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQ2xDLENBQUM7Ozs7SUFFRCwyQkFBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELDhFQUE4RTs7Ozs7SUFDOUUsZ0NBQWE7Ozs7SUFBYjtRQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsbURBQW1EOzs7Ozs7O0lBQ25ELDhCQUFXOzs7Ozs7SUFBWCxVQUFZLFlBQXFCLEVBQUUsY0FBdUI7UUFDeEQsSUFBSSxZQUFZLEVBQUU7WUFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMzQjtRQUNELElBQUksY0FBYyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ25EO0lBQ0gsQ0FBQztJQUNILGVBQUM7QUFBRCxDQUFDLEFBL0VELElBK0VDOzs7Ozs7Ozs7OztJQTdFQyxxQ0FBcUI7Ozs7OztJQUdyQixtQ0FBNEI7Ozs7OztJQUc1QixnQ0FBMEM7Ozs7OztJQUUxQyw2QkFBdUM7Ozs7OztJQUV2QyxnQ0FBMEM7Ozs7OztJQUUxQyxpQ0FBMkM7Ozs7OztJQUUzQyxtQ0FBZ0Q7Ozs7O0lBRXBDLCtCQUErQjs7Ozs7QUFnRTdDOzs7O0lBQ0UsdUJBQ1UsYUFBMkIsRUFDM0IsZUFBeUI7UUFEekIsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFDM0Isb0JBQWUsR0FBZixlQUFlLENBQVU7SUFDaEMsQ0FBQzs7Ozs7Ozs7SUFFSiwyQkFBRzs7Ozs7OztJQUFILFVBQU8sS0FBVSxFQUFFLGFBQWlCLEVBQUUsS0FBbUI7UUFDdkQsSUFBSSxLQUFLLEtBQUssWUFBWSxFQUFFO1lBQzFCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUMzQjtRQUNELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUksS0FBSyxFQUFFLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQzs7Ozs7Ozs7OztJQVZHLHNDQUFtQzs7Ozs7SUFDbkMsd0NBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0b3IsIEluamVjdEZsYWdzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPdmVybGF5UmVmIH0gZnJvbSAnLi4vb3ZlcmxheS9vdmVybGF5LXJlZic7XG5pbXBvcnQgeyBUb2FzdFBhY2thZ2UgfSBmcm9tICcuL3RvYXN0ci1jb25maWcnO1xuXG4vKipcbiAqIFJlZmVyZW5jZSB0byBhIHRvYXN0IG9wZW5lZCB2aWEgdGhlIFRvYXN0ciBzZXJ2aWNlLlxuICovXG5leHBvcnQgY2xhc3MgVG9hc3RSZWY8VD4ge1xuICAvKiogVGhlIGluc3RhbmNlIG9mIGNvbXBvbmVudCBvcGVuZWQgaW50byB0aGUgdG9hc3QuICovXG4gIGNvbXBvbmVudEluc3RhbmNlOiBUO1xuXG4gIC8qKiBDb3VudCBvZiBkdXBsaWNhdGVzIG9mIHRoaXMgdG9hc3QgKi9cbiAgcHJpdmF0ZSBkdXBsaWNhdGVzQ291bnQgPSAwO1xuXG4gIC8qKiBTdWJqZWN0IGZvciBub3RpZnlpbmcgdGhlIHVzZXIgdGhhdCB0aGUgdG9hc3QgaGFzIGZpbmlzaGVkIGNsb3NpbmcuICovXG4gIHByaXZhdGUgX2FmdGVyQ2xvc2VkID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAvKiogdHJpZ2dlcmVkIHdoZW4gdG9hc3QgaXMgYWN0aXZhdGVkICovXG4gIHByaXZhdGUgX2FjdGl2YXRlID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAvKiogbm90aWZpZXMgdGhlIHRvYXN0IHRoYXQgaXQgc2hvdWxkIGNsb3NlIGJlZm9yZSB0aGUgdGltZW91dCAqL1xuICBwcml2YXRlIF9tYW51YWxDbG9zZSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgLyoqIG5vdGlmaWVzIHRoZSB0b2FzdCB0aGF0IGl0IHNob3VsZCByZXNldCB0aGUgdGltZW91dHMgKi9cbiAgcHJpdmF0ZSBfcmVzZXRUaW1lb3V0ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAvKiogbm90aWZpZXMgdGhlIHRvYXN0IHRoYXQgaXQgc2hvdWxkIGNvdW50IGEgZHVwbGljYXRlIHRvYXN0ICovXG4gIHByaXZhdGUgX2NvdW50RHVwbGljYXRlID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX292ZXJsYXlSZWY6IE92ZXJsYXlSZWYpIHt9XG5cbiAgbWFudWFsQ2xvc2UoKSB7XG4gICAgdGhpcy5fbWFudWFsQ2xvc2UubmV4dCgpO1xuICAgIHRoaXMuX21hbnVhbENsb3NlLmNvbXBsZXRlKCk7XG4gIH1cblxuICBtYW51YWxDbG9zZWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fbWFudWFsQ2xvc2UuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICB0aW1lb3V0UmVzZXQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVzZXRUaW1lb3V0LmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgY291bnREdXBsaWNhdGUoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fY291bnREdXBsaWNhdGUuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2UgdGhlIHRvYXN0LlxuICAgKi9cbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fb3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICB0aGlzLl9hZnRlckNsb3NlZC5uZXh0KCk7XG4gICAgdGhpcy5fbWFudWFsQ2xvc2UubmV4dCgpO1xuICAgIHRoaXMuX2FmdGVyQ2xvc2VkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fbWFudWFsQ2xvc2UuY29tcGxldGUoKTtcbiAgICB0aGlzLl9hY3RpdmF0ZS5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX3Jlc2V0VGltZW91dC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2NvdW50RHVwbGljYXRlLmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKiogR2V0cyBhbiBvYnNlcnZhYmxlIHRoYXQgaXMgbm90aWZpZWQgd2hlbiB0aGUgdG9hc3QgaXMgZmluaXNoZWQgY2xvc2luZy4gKi9cbiAgYWZ0ZXJDbG9zZWQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fYWZ0ZXJDbG9zZWQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBpc0luYWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmF0ZS5pc1N0b3BwZWQ7XG4gIH1cblxuICBhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLl9hY3RpdmF0ZS5uZXh0KCk7XG4gICAgdGhpcy5fYWN0aXZhdGUuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIGFuIG9ic2VydmFibGUgdGhhdCBpcyBub3RpZmllZCB3aGVuIHRoZSB0b2FzdCBoYXMgc3RhcnRlZCBvcGVuaW5nLiAqL1xuICBhZnRlckFjdGl2YXRlKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2YXRlLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqIFJlc2V0IHRoZSB0b2FzdCB0aW1vdXRzIGFuZCBjb3VudCBkdXBsaWNhdGVzICovXG4gIG9uRHVwbGljYXRlKHJlc2V0VGltZW91dDogYm9vbGVhbiwgY291bnREdXBsaWNhdGU6IGJvb2xlYW4pIHtcbiAgICBpZiAocmVzZXRUaW1lb3V0KSB7XG4gICAgICB0aGlzLl9yZXNldFRpbWVvdXQubmV4dCgpO1xuICAgIH1cbiAgICBpZiAoY291bnREdXBsaWNhdGUpIHtcbiAgICAgIHRoaXMuX2NvdW50RHVwbGljYXRlLm5leHQoKyt0aGlzLmR1cGxpY2F0ZXNDb3VudCk7XG4gICAgfVxuICB9XG59XG5cbi8qKiBDdXN0b20gaW5qZWN0b3IgdHlwZSBzcGVjaWZpY2FsbHkgZm9yIGluc3RhbnRpYXRpbmcgY29tcG9uZW50cyB3aXRoIGEgdG9hc3QuICovXG5leHBvcnQgY2xhc3MgVG9hc3RJbmplY3RvciBpbXBsZW1lbnRzIEluamVjdG9yIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfdG9hc3RQYWNrYWdlOiBUb2FzdFBhY2thZ2UsXG4gICAgcHJpdmF0ZSBfcGFyZW50SW5qZWN0b3I6IEluamVjdG9yXG4gICkge31cblxuICBnZXQ8VD4odG9rZW46IGFueSwgbm90Rm91bmRWYWx1ZT86IFQsIGZsYWdzPzogSW5qZWN0RmxhZ3MpOiBUIHwgVG9hc3RQYWNrYWdlIHtcbiAgICBpZiAodG9rZW4gPT09IFRvYXN0UGFja2FnZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3RvYXN0UGFja2FnZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudEluamVjdG9yLmdldDxUPih0b2tlbiwgbm90Rm91bmRWYWx1ZSwgZmxhZ3MpO1xuICB9XG59XG4iXX0=