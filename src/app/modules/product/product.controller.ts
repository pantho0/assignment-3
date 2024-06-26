import { Request, Response } from 'express';
import { productServices } from './product.service';
import productValidationSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const zodParsedData = productValidationSchema.parse(product);

    const result = await productServices.createProductIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Inputs are invalid',
      error: { error },
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string | null;
    if (searchTerm) {
      const result = await productServices.productSearchIntoDB(searchTerm);
      if (result.length === 0) {
        return res.status(200).json({
          success: true,
          message: `No product found by your search term ${searchTerm}`,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: `Product matching search term '${searchTerm}' successfully`,
          data: result,
        });
      }
    }
    const result = await productServices.getAllProductsFromDB();
    return res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSingleProductFromDB(productId);
    if (result) {
      return res.status(200).json({
        success: true,
        message: 'Product fetched successfully!',
        data: result,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'No product found with your product id',
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = req.body;
    const zodParsedData = productValidationSchema.parse(product);
    const result = await productServices.updateProductIntoDB(
      productId,
      zodParsedData,
    );
    console.log(result);
    const updatedDoc = await productServices.getSingleProductFromDB(productId);
    return res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: updatedDoc,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Internal Server Error',
      error: error,
    });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.deleteProductFromDB(productId);
    if (result) {
      return res.status(200).json({
        success: true,
        message: 'Product deleted successfully!',
        data: null,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'No product found with your product id',
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
