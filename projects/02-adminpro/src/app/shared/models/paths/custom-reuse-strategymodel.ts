import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';

export class CustomReuseStrategy extends RouteReuseStrategy {
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {}

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
      return null;
  }

  shouldReuseRoute(
      future: ActivatedRouteSnapshot,
      curr: ActivatedRouteSnapshot):
      boolean {
        if (future.routeConfig !== curr.routeConfig) {
           return false;
        }
        if (JSON.stringify(future.params) !== JSON.stringify(curr.params)) {
           return false;
        }
        if (future.queryParams['order_by'] !== curr.queryParams['order_by'] || future.queryParams['sort_direction'] !== curr.queryParams['sort_direction']) {
           return false;
        }

        // avoiding to call guards more than once
        if (!curr.data || !curr.data['reuse'] || !future.data || !future.data['reuse']) {
          return false;
        }

        return true;
  }
}
