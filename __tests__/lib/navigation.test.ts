import {
  getNavigationByPlacement,
  isMoreRoute,
  isNavItemActive,
  navigationItems,
} from "@/lib/navigation";

describe("isNavItemActive", () => {
  it("matches the dashboard only on the home path", () => {
    expect(isNavItemActive("/", "/")).toBe(true);
    expect(isNavItemActive("/transfers", "/")).toBe(false);
    expect(isNavItemActive("/transactions", "/")).toBe(false);
  });

  it("keeps parent items active on nested routes", () => {
    expect(isNavItemActive("/transactions", "/transactions")).toBe(true);
    expect(isNavItemActive("/transactions/TXN-1", "/transactions")).toBe(true);
    expect(isNavItemActive("/transfers", "/transfers")).toBe(true);
    expect(isNavItemActive("/transfers/review", "/transfers")).toBe(true);
  });
});

describe("getNavigationByPlacement", () => {
  it("lists only completed MVP destinations", () => {
    const ids = navigationItems.map((item) => item.id);

    expect(ids).toEqual([
      "dashboard",
      "transfers",
      "transactions",
      "settings",
      "support",
    ]);
    expect(ids).not.toContain("invoices");
    expect(ids).not.toContain("messages");
    expect(ids).not.toContain("wallets");
  });

  it("lists Dashboard, Send Money, and Transactions in the sidebar and mobile tabs", () => {
    const sidebarIds = getNavigationByPlacement("sidebar").map((item) => item.id);
    const tabIds = getNavigationByPlacement("mobile-tab").map((item) => item.id);

    expect(sidebarIds).toEqual([
      "dashboard",
      "transfers",
      "transactions",
    ]);
    expect(tabIds).toEqual([
      "dashboard",
      "transfers",
      "transactions",
    ]);
  });

  it("keeps Settings and Support in the footer and More menu", () => {
    const footerIds = getNavigationByPlacement("sidebar-footer").map(
      (item) => item.id,
    );
    const moreIds = getNavigationByPlacement("mobile-more").map((item) => item.id);

    expect(footerIds).toEqual(["settings", "support"]);
    expect(moreIds).toEqual(["settings", "support"]);
  });
});

describe("isMoreRoute", () => {
  it("treats Settings and Support as More destinations", () => {
    expect(isMoreRoute("/settings")).toBe(true);
    expect(isMoreRoute("/settings/profile")).toBe(true);
    expect(isMoreRoute("/support")).toBe(true);
    expect(isMoreRoute("/")).toBe(false);
    expect(isMoreRoute("/transfers")).toBe(false);
  });
});
