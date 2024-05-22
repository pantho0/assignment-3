import { TProduct } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

const updateProductIntoDB = async (id: string, product: TProduct) => {
  const result = await ProductModel.findByIdAndUpdate(id, product);
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

const productSearchIntoDB = async (searchTerm: string) => {
  const result = await ProductModel.find({ $text: { $search: searchTerm } });
  return result;
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  productSearchIntoDB,
};
