"use client"

import { Category } from "@prisma/client"

import { 
HiOutlineScale,
HiOutlineAcademicCap,
} from "react-icons/hi";
import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";


interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"],IconType> = { 
"Direito Ambiental": HiOutlineScale,
"Direito Civil": HiOutlineScale,
"Direito Contratual": HiOutlineScale,
"Direito da Tecnologia da Informação": HiOutlineScale,
"Direito do Consumidor": HiOutlineScale,
"Direito Empresarial": HiOutlineScale,
"Direito Trabalhista": HiOutlineScale,
"Direito Penal": HiOutlineScale,
"Pós Graduação em Direito Previdenciario": HiOutlineAcademicCap,

};

export const Categories = ({
  items,
}:CategoriesProps) => { 
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem 
        key={item.id}
        label={item.name}
        icon={iconMap[item.name]}
        value={item.id}
          />
      ))}
    </div>
  )
}