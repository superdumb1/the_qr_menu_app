type MenuGroup = {
  type: string; // "Food", "Drinks", etc.
  categories: Category[];
};

type Category = {
  id: number;
  name: string;
  name_ne?: string;
  image?: string;
  items: MenuItem[];
};

type MenuItem = {
  id: number;
  name: string;
  name_ne?: string;
  description?: string;
  price: number;
  image?: string;
  isVeg: boolean;
  isAvailable: boolean;
  tags?: string[];
};