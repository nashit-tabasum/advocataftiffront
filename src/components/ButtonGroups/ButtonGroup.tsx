import BasicButtonGroup from "./BasicButtonGroup";
import IconButtonGroup from "./IconButtonGroup";
import StatButtonGroup from "./StatButtonGroup";
import DropdownButtonGroup from "./DropdownButtonGroup";
import CheckboxButtonGroup from "./CheckboxButtonGroup";

export default function ButtonGroup() {
  return (
    <div className="bg-gray-500 text-center">
      <h1 className="text-3xl font-bold text-white text-center py-10 mb-14 border-b border-b-white">
        Button Groups Showcase
      </h1>

      <div className="grid justify-center space-y-12 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 pb-16">
        {/* Property 1: Basic */}
        <div>
          <h2 className="text-xl font-bold text-gray-50 text-center pb-2 mb-4 border-b border-b-white">
            Property 1: Basic Buttons
          </h2>
          <BasicButtonGroup />
        </div>

        {/* Property 2: Icon only */}
        <div>
          <h2 className="text-xl font-bold text-gray-50 text-center pb-2 mb-4 border-b border-b-white">
            Property 2: Icon Buttons
          </h2>
          <IconButtonGroup />
        </div>

        {/* Property 3: With Stat */}
        <div>
          <h2 className="text-xl font-bold text-gray-50 text-center pb-2 mb-4 border-b border-b-white">
            Property 3: With Stat
          </h2>
          <StatButtonGroup />
        </div>

        {/* Property 4: Dropdown */}
        <div>
          <h2 className="text-xl font-bold text-gray-50 text-center pb-2 mb-4 border-b border-b-white">
            Property 4: With Dropdown
          </h2>
          <DropdownButtonGroup />
        </div>

        {/* Property 5: Checkbox + Dropdown */}
        <div>
          <h2 className="text-xl font-bold text-gray-50 text-center pb-2 mb-4 border-b border-b-white">
            Property 5: Checkbox + Dropdown
          </h2>
          <CheckboxButtonGroup />
        </div>
      </div>
    </div>
  );
}
