"use client";
import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FiLogOut } from "react-icons/fi";

export const LogoutButton = ({ logout }: { logout: () => void }) => {
  return (
    <div className="w-full flex justify-center mt-6">
      <Menu as="div" className="relative">
        <Menu.Button
          className="
            flex items-center gap-2
            bg-red-600 hover:bg-red-700
            focus:bg-red-700 focus:ring-2 focus:ring-red-500
            text-white font-semibold
            px-5 py-3 rounded-xl
            shadow-lg shadow-red-700/30
            transition-all duration-300
            active:scale-95
            outline-none
          "
        >
          <FiLogOut size={18} />
          Cerrar sesión
        </Menu.Button>

        {/* En caso de querer agregar futuras opciones */}
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-44 bg-gray-900 border border-gray-700 rounded-xl shadow-lg overflow-hidden z-50">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={`w-full flex items-center gap-2 px-4 py-3 text-left transition ${
                    active ? "bg-red-700 text-white" : "text-gray-200"
                  }`}
                >
                  <FiLogOut size={16} />
                  Cerrar sesión
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
