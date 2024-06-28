import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchOrchids, createOrchid, updateOrchid, deleteOrchid } from '../pages/api/Orchids';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manage = () => {
    const [products, setProducts] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
        const getOrchids = async () => {
            try {
                const orchids = await fetchOrchids();
                setProducts(orchids);
            } catch (error) {
                console.error('Error fetching orchids:', error);
            }
        };

        getOrchids();
    }, []);

    const handleAddProduct = async (values, { setSubmitting }) => {
        try {
            const createdProduct = await createOrchid(values);
            setProducts([...products, createdProduct]);
            setIsAddModalOpen(false);
            toast.success('Product created successfully!');
        } catch (error) {
            console.error('Error creating product:', error);
        }
        setSubmitting(false);
    };

    const handleEditProduct = async (values, { setSubmitting }) => {
        try {
            const updatedProduct = await updateOrchid(currentProduct.id, values);
            setProducts(products.map(p => p.id === currentProduct.id ? updatedProduct : p));
            setIsEditModalOpen(false);
            toast.success('Product updated successfully!');
        } catch (error) {
            console.error(`Error updating product with id ${currentProduct.id}:`, error);
        }
        setSubmitting(false);
    };

    const handleDeleteProduct = async () => {
        try {
            await deleteOrchid(currentProduct.id);
            setProducts(products.filter(p => p.id !== currentProduct.id));
            setIsDeleteModalOpen(false);
            toast.success('Product deleted successfully!');
        } catch (error) {
            console.error(`Error deleting product with id ${currentProduct.id}:`, error);
        }
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const openEditModal = (product) => {
        setCurrentProduct(product);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (product) => {
        setCurrentProduct(product);
        setIsDeleteModalOpen(true);
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required').min(3, 'Name must be at least 3 characters').max(50, 'Name can be at most 50 characters'),
        rating: Yup.number().required('Required').min(1, 'Rating must be at least 1').max(5, 'Rating can be at most 5'),
        isSpecial: Yup.boolean().required('Required'),
        image: Yup.string().url('Invalid URL').required('Required').min(3, 'Image must be at least 3 characters').max(255, 'Image can be at most 255 characters'),
        color: Yup.string().required('Required').min(3, 'Color must be at least 3 characters').max(50, 'Color can be at most 50 characters'),
        origin: Yup.string().required('Required').min(3, 'Origin must be at least 3 characters').max(50, 'Origin can be at most 50 characters'),
        category: Yup.string().required('Required').min(3, 'Category must be at least 3 characters').max(50, 'Category can be at most 50 characters'),
        description: Yup.string().required('Required').min(3, 'Description must be at least 3 characters').max(255, 'Description can be at most 255 characters')
    });

    return (
        <>
            <Head>
                <title>Manage</title>
                <meta name="description" content="Manage page" />
            </Head>
            <main className="bg-dark text-light dark:bg-light dark:text-dark min-h-screen p-4">
                <div className="container mx-auto">
                    <div className="overflow-x-auto">
                        <div className="flex justify-between items-center">
                            <h1 className="font-bold py-10 text-2xl">Orchids Management</h1>
                        </div>
                        <div className="text-right mb-4">
                            <button className="btn btn-primary" onClick={openAddModal}>
                                Add Product
                            </button>
                        </div>
                        <table className="table w-full bg-gray-800">
                            <thead>
                                <tr>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <th>PRODUCT</th>
                                    <th>CATEGORY</th>
                                    <th>ISSPECIAL</th>
                                    <th>COLOR</th>
                                    <th>ORIGIN</th>
                                    <th>RATING</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr className="hover border-b border-gray-700" key={product.id}>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <Image
                                                            src={product.image}
                                                            alt={product.name}
                                                            width={80}
                                                            height={80}
                                                            className="rounded-lg"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{product.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{product.category}</td>
                                        <td>{product.isSpecial ? 'Yes' : 'No'}</td>
                                        <td>{product.color}</td>
                                        <td>{product.origin}</td>
                                        <td className="flex items-center">
                                            <span className="text-yellow-400">{"★".repeat(product.rating)}</span>
                                            <span className="ml-2">{product.rating}.0</span>
                                        </td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button className="btn btn-primary" onClick={() => openEditModal(product)}>Edit</button>
                                                <button className="btn btn-secondary" onClick={() => openDeleteModal(product)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Add Product Modal */}
            {isAddModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Add New Product</h3>
                        <Formik
                            initialValues={{
                                name: '',
                                rating: '',
                                isSpecial: false,
                                image: '',
                                color: '',
                                origin: '',
                                category: '',
                                description: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleAddProduct}
                        >
                            {({ isSubmitting }) => (
                                <Form className="py-4">
                                    <Field
                                        type="text"
                                        name="name"
                                        placeholder="Product Name"
                                        className="input input-bordered w-full mb-2"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-red-600" />
                                    <Field
                                        type="number"
                                        name="rating"
                                        placeholder="Rating"
                                        className="input input-bordered w-full mb-2"
                                    />
                                    <ErrorMessage name="rating" component="div" className="text-red-600" />
                                    <label>
                                        <Field
                                            type="checkbox"
                                            name="isSpecial"
                                            className="checkbox mb-2"
                                        /> Is Special
                                    </label>
                                    <ErrorMessage name="isSpecial" component="div" className="text-red-600" />
                                    <Field
                                        type="text"
                                        name="image"
                                        placeholder="Image URL"
                                        className="input input-bordered w-full mb-2"
                                    />
                                    <ErrorMessage name="image" component="div" className="text-red-600" />
                                    <Field
                                        type="text"
                                        name="color"
                                        placeholder="Color"
                                        className="input input-bordered w-full mb-2"
                                    />
                                    <ErrorMessage name="color" component="div" className="text-red-600" />
                                    <Field
                                        type="text"
                                        name="origin"
                                        placeholder="Origin"
                                        className="input input-bordered w-full mb-2"
                                    />
                                    <ErrorMessage name="origin" component="div" className="text-red-600" />
                                    <Field
                                        type="text"
                                        name="category"
                                        placeholder="Category"
                                        className="input input-bordered w-full mb-2"
                                    />
                                    <ErrorMessage name="category" component="div" className="text-red-600" />
                                    <Field
                                        as="textarea"
                                        name="description"
                                        placeholder="Description"
                                        className="textarea textarea-bordered w-full mb-2"
                                    />
                                    <ErrorMessage name="description" component="div" className="text-red-600" />
                                    <div className="modal-action">
                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                            Save
                                        </button>
                                        <button type="button" className="btn" onClick={() => setIsAddModalOpen(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}

            {/* Edit Product Modal */}
            {isEditModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Edit Product</h3>
                        <Formik
                            initialValues={{
                                name: currentProduct?.name || '',
                                rating: currentProduct?.rating || '',
                                isSpecial: currentProduct?.isSpecial || false,
                                image: currentProduct?.image || '',
                                color: currentProduct?.color || '',
                                origin: currentProduct?.origin || '',
                                category: currentProduct?.category || '',
                                description: currentProduct?.description || '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleEditProduct}
                        >
                            {({ isSubmitting }) => (
                                <Form className="py-4">
                                    <Field
                                        type="text"
                                        name="name"
                                        placeholder="Product Name"
                                        className="input input-bordered w-full mb-2"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-red-600" />
                                    <Field
                                        type="number"
                                        name="rating"
                                        placeholder="Rating"
                                        className="input input-bordered w-full mb-2"
                                    />
                                    <ErrorMessage name="rating" component="div" className="text-red-600" />
                                    <label>
                                        <Field
                                            type="checkbox"
                                            name="isSpecial"
                                            className="checkbox mb-2"
                                        /> Is Special
                                    </label>
                                    <ErrorMessage name="isSpecial" component="div" className="text-red-600" />
                                    <Field
                                        type="text"
                                        name="image"
                                        placeholder="Image URL"
                                        className="input input-bordered w-full mb-2"
                                    />
                                    <ErrorMessage name="image" component="div" className="text-red-600" />
                                    <Field
                                        type="text"
                                        name="color"
                                        placeholder="Color"
                                        className="input input-bordered w-full mb-2"
                                    />
                                    <ErrorMessage name="color" component="div" className="text-red-600" />
                                    <Field
                                        type="text"
                                        name="origin"
                                        placeholder="Origin"
                                        className="input input-bordered w-full mb-2"
                                    />
                                    <ErrorMessage name="origin" component="div" className="text-red-600" />
                                    <Field
                                        type="text"
                                        name="category"
                                        placeholder="Category"
                                        className="input input-bordered w-full mb-2"
                                    />
                                    <ErrorMessage name="category" component="div" className="text-red-600" />
                                    <Field
                                        as="textarea"
                                        name="description"
                                        placeholder="Description"
                                        className="textarea textarea-bordered w-full mb-2"
                                    />
                                    <ErrorMessage name="description" component="div" className="text-red-600" />
                                    <div className="modal-action">
                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                            Save
                                        </button>
                                        <button type="button" className="btn" onClick={() => setIsEditModalOpen(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}

            {/* Delete Product Modal */}
            {isDeleteModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Delete Product</h3>
                        <p className="py-4">Are you sure you want to delete this product?</p>
                        <div className="modal-action">
                            <button className="btn btn-primary" onClick={handleDeleteProduct}>Yes</button>
                            <button className="btn" onClick={() => setIsDeleteModalOpen(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </>
    );
};

export default Manage;
