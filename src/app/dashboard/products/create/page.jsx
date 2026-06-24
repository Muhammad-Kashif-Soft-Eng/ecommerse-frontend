"use client";

import { createProduct } from "@/lib/api/product.api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FaBoxOpen, FaDollarSign, FaTags, FaWarehouse, FaImage, FaAlignLeft } from "react-icons/fa";

export default function CreateProductComponent() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ mode: "onBlur" });

    const [resMessage, setResponseMessage] = useState("");

    const router = useRouter();

    const onSubmit = async (data) => {

        const formData = new FormData();

        formData.append("productname", data.productname.trim());
        formData.append("description", data.description.trim());
        formData.append("price", data.price);
        formData.append("category", data.category.trim());
        formData.append("countInStock", data.countInStock);
        if (data.image?.length) {
            formData.append("image", data.image[0]);
        }

        const res = await createProduct(formData);
        setResponseMessage(res.message);

        setTimeout(() => {
            setResponseMessage("");
        }, 3000);

        if (res.success) {
            reset();

            setTimeout(() => {
                router.push("/dashboard");
            }, 1500);
        };

    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-purple-50 py-6 px-2">
            {/* Decorative background */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
                <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-cyan-400/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-purple-500/15 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-lg bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-6 border border-slate-100"
            >
                <h2 className="text-2xl font-bold text-slate-800 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-purple-600">
                    Create New Product
                </h2>

                {/* Response Message */}
                {resMessage && (
                    <div
                        className={`mt-6 text-center py-3 px-4 rounded-lg font-medium shadow-md 
                            ${resMessage.toLowerCase().includes("success")
                                ? "bg-green-100 text-green-700 border border-green-300"
                                : "bg-red-100 text-red-700 border border-red-300"
                            }`}
                    >
                        {resMessage}
                    </div>
                )}


                {/* Product Name */}
                <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-3">
                        <FaBoxOpen className="text-cyan-600 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Product Name"
                            {...register("productname", {
                                required: "Product name is required",
                                minLength: {
                                    value: 3,
                                    message: "Minimum 3 characters."
                                },
                                maxLength: {
                                    value: 200,
                                    message: "Maximum 200 characters."
                                },
                            })}
                            className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                        />
                    </div>
                    {errors.productname && <p className="text-red-500 text-xs italic mt-1 ml-8"> {errors.productname.message} </p>}
                </div>

                {/* Description */}
                <div className="flex flex-col flex-1">
                    <div className="flex items-start gap-3">
                        <FaAlignLeft className="text-purple-600 w-5 h-5 mt-2" />
                        <textarea
                            placeholder="Description"
                            {...register("description", {
                                required: "Description is required.",
                                minLength: {
                                    value: 10,
                                    message: "Minimum 10 characters."
                                },
                                maxLength: {
                                    value: 500,
                                    message: "Maximum 500 characters."
                                },
                            })}
                            className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                            rows={4}
                        />
                    </div>
                    {errors.description && <p className="text-red-500 text-xs italic mt-1 ml-8">{errors.description.message}</p>}
                </div>

                {/* Price */}
                <div className="flex flex-col flex-1">

                    <div className="flex items-center gap-3">
                        <FaDollarSign className="text-green-600 w-5 h-5" />
                        <input
                            type="number"
                            placeholder="Price"
                            {...register("price", {
                                valueAsNumber: true,
                                required: "Price is required",
                                min: {
                                    value: 1,
                                    message: "Price must be at least 1"
                                }
                            })}
                            className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-green-400 focus:outline-none"
                        />
                    </div>
                    {errors.price && <p className="text-red-500 text-xs italic mt-1 ml-8">{errors.price.message}</p>}
                </div>

                {/* Category */}
                <div className="flex flex-col flex-1">

                    <div className="flex items-center gap-3">
                        <FaTags className="text-pink-600 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Category"
                            {...register("category", { required: "Category is required" })}
                            className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-pink-400 focus:outline-none"
                        />
                    </div>
                    {errors.category && <p className="text-red-500 text-xs italic mt-1 ml-8">{errors.category.message}</p>}
                </div>

                {/* Stock */}
                <div className="flex flex-col flex-1">

                    <div className="flex items-center gap-3">
                        <FaWarehouse className="text-indigo-600 w-5 h-5" />
                        <input
                            type="number"
                            placeholder="Count in Stock"
                            {...register("countInStock", {
                                valueAsNumber: true,
                                required: "Stock quantity is required",
                                min: {
                                    value: 0,
                                    message: "Stock cannot be negative"
                                }
                            })}
                            className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        />
                    </div>
                    {errors.countInStock && <p className="text-red-500 text-xs italic mt-1 ml-8">{errors.countInStock.message}</p>}
                </div>

                {/* Image Upload */}
                <div className="flex flex-col flex-1">

                    <div className="flex items-center gap-3">
                        <FaImage className="text-teal-600 w-5 h-5" />
                        <input
                            type="file"
                            accept="image/*"
                            {...register("image", {
                                required: "Product image is required"
                            })}
                            className="flex-1 text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:text-white hover:file:bg-cyan-600 cursor-pointer"
                        />
                    </div>
                    {errors.image && <p className="text-red-500 text-xs italic mt-1 ml-8">{errors.image.message}</p>}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full cursor-pointer py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-md hover:scale-[1.02] transition-transform focus:outline-none focus:ring-2 focus:ring-teal-400/50"
                >
                    {isSubmitting ? "Creating..." : "Create Product"}
                </button>
            </form>
        </div>
    );
}
