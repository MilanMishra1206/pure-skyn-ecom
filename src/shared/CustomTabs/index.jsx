import { Tab, Tabs } from "@mui/material";

function CustomTabs({ tabs, selectedTab, onTabChange, tabClass = "px-2" }) {
  return (
    <Tabs
      value={selectedTab}
      onChange={onTabChange}
      variant="scrollable"
      scrollButtons="auto"
      classes={{
        indicator: "hidden",
      }}
      className={`!bg-transparent !py-4 ${tabClass} md:!px-4`}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab?.label}
          value={tab?.value}
          disableRipple
          label={
            <div
              title={tab?.label}
              className={`rounded-full !normal-case border px-4 py-2 mx-0 text-[12px] font-semibold min-h-0 h-auto min-w-min
              ${
                selectedTab === tab?.value
                  ? "bg-[#88DEEC] text-[#071E54] border-[#88DEEC]"
                  : "bg-transparent text-[#071E54] border-[#88DEEC] hover:bg-gray-100"
              }`}
            >
              {tab?.label && tab.label.length > 20
                ? `${tab.label.slice(0, 20)}...`
                : tab.label}
            </div>
          }
          className="!pr-1 !pl-0 !py-0 !min-w-min !min-h-0"
        />
      ))}
    </Tabs>
  );
}

export default CustomTabs;
