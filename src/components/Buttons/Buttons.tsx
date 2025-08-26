import PrimaryButton from "./PrimaryBtn";
import SecondaryButton from "./SecondaryBtn";
import WhiteButton from "./WhiteBtn";
import PrimaryIconButton from "./PrimaryIconBtn";
import SecondaryIconButton from "./SecondaryIconBtn";
import WhiteIconButton from "./WhiteIconBtn";
import CircularButton from "./CircularBtn";
import DropdownButton from "./DropdownBtn";

export default function Buttons() {
  return (
    <div className="bg-gray-500 text-center">
      <h1 className="text-3xl font-bold text-gray-50 text-center py-10 mb-14 border-b border-b-white">
        Buttons Showcase
      </h1>

      <div className="grid justify-center space-y-12 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 pb-16">
        {/* Primary Button */}
        <div>
          <h2 className="text-xl font-bold text-gray-50 text-center pb-2 mb-4 border-b border-b-white">
            Primary Button
          </h2>
          <PrimaryButton>Primary Button</PrimaryButton>
        </div>

        {/* Secondary Button */}
        <div>
          <h2 className="text-xl font-bold text-gray-50 text-center pb-2 mb-4 border-b border-b-white">
            Secondary Button
          </h2>
          <SecondaryButton>Secondary Button</SecondaryButton>
        </div>

        {/* White Button */}
        <div>
          <h2 className="text-xl font-bold text-gray-50 text-center pb-2 mb-4 border-b border-b-white">
            White Button
          </h2>
          <WhiteButton>White Button</WhiteButton>
        </div>

        {/* Primary Icon Button */}
        <div>
          <h2 className="text-xl font-bold text-gray-50 text-center pb-2 mb-4 border-b border-b-white">
            Primary With Icon
          </h2>
          <PrimaryIconButton />
        </div>

        {/* Secondary Icon Button */}
        <div>
          <h2 className="text-xl font-bold text-gray-50 text-center pb-2 mb-4 border-b border-b-white">
            Secondary With Icon
          </h2>
          <SecondaryIconButton />
        </div>

        {/* White Icon Button */}
        <div>
          <h2 className="text-xl font-bold text-gray-50 text-center pb-2 mb-4 border-b border-b-white">
            White With Icon
          </h2>
          <WhiteIconButton />
        </div>

        {/* Circular Button */}
        <div>
          <h2 className="text-xl font-bold text-gray-50 text-center pb-2 mb-4 border-b border-b-white">
            Circular Button
          </h2>
          <CircularButton />
        </div>

        {/* Dropdown Button */}
        <div>
          <h2 className="text-xl font-bold text-gray-50 text-center pb-2 mb-4 border-b border-b-white">
            Dropdown Button
          </h2>
          <DropdownButton />
        </div>
      </div>
    </div>
  );
}
