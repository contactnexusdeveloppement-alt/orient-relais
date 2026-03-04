import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useMemo, useCallback } from "react";
import { FilterConfig, getFiltersForCategory, ActiveFilters, filterProducts } from "@/lib/filters";
import { WooProduct } from "@/lib/woocommerce-types";
import { Badge } from "@/components/ui/badge";
import { X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductFiltersProps {
    category: string;
    products: WooProduct[];
    onFilterChange: (filteredProducts: WooProduct[]) => void;
}

export function ProductFilters({ category, products, onFilterChange }: ProductFiltersProps) {
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});

    // Generate dynamic filter configuration based on category and products
    const filterConfigs = useMemo(() => {
        return getFiltersForCategory(category, products);
    }, [category, products]);

    // Initialize price range from products
    const priceConfig = filterConfigs.find(f => f.key === "price");
    const [priceRange, setPriceRange] = useState<[number, number]>([
        priceConfig?.min || 0,
        priceConfig?.max || 100
    ]);

    // Update price range when config changes
    useEffect(() => {
        if (priceConfig) {
            setPriceRange([priceConfig.min || 0, priceConfig.max || 100]);
        }
    }, [priceConfig]);

    // Apply filters when they change
    useEffect(() => {
        const filtersWithPrice = {
            ...activeFilters,
            price: priceRange
        };
        const filtered = filterProducts(products, filtersWithPrice);
        onFilterChange(filtered);
    }, [activeFilters, priceRange, products, onFilterChange]);

    // Toggle a checkbox filter
    const toggleFilter = useCallback((key: string, value: string) => {
        setActiveFilters(prev => {
            const current = (prev[key] as string[]) || [];
            const newValues = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];
            return {
                ...prev,
                [key]: newValues
            };
        });
    }, []);

    // Reset all filters
    const resetFilters = useCallback(() => {
        setActiveFilters({});
        if (priceConfig) {
            setPriceRange([priceConfig.min || 0, priceConfig.max || 100]);
        }
    }, [priceConfig]);

    // Count active filters
    const activeFilterCount = useMemo(() => {
        let count = 0;
        Object.values(activeFilters).forEach(value => {
            if (Array.isArray(value)) count += value.length;
        });
        // Check if price range is modified
        if (priceConfig && (priceRange[0] > (priceConfig.min || 0) || priceRange[1] < (priceConfig.max || 100))) {
            count++;
        }
        return count;
    }, [activeFilters, priceRange, priceConfig]);

    // Get all checked filters for display
    const getActiveFilterTags = useMemo(() => {
        const tags: { key: string; value: string; label: string }[] = [];
        Object.entries(activeFilters).forEach(([key, values]) => {
            if (Array.isArray(values) && typeof values[0] === 'string') {
                (values as string[]).forEach(value => {
                    const config = filterConfigs.find(f => f.key === key);
                    const option = config?.options?.find(o => o.value === value);
                    tags.push({ key, value: String(value), label: option?.label || String(value) });
                });
            }
        });
        return tags;
    }, [activeFilters, filterConfigs]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-stone-900">
                    Filtres
                    {activeFilterCount > 0 && (
                        <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                            {activeFilterCount}
                        </Badge>
                    )}
                </h3>
                {activeFilterCount > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetFilters}
                        className="text-sm text-stone-500 hover:text-primary flex items-center gap-1"
                    >
                        <RotateCcw className="h-3 w-3" />
                        Réinitialiser
                    </Button>
                )}
            </div>

            {/* Active filter tags */}
            {getActiveFilterTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {getActiveFilterTags.map(tag => (
                        <Badge
                            key={`${tag.key}-${tag.value}`}
                            variant="outline"
                            className="bg-primary/5 border-primary/20 text-stone-700 cursor-pointer hover:bg-primary/10 pr-1"
                            onClick={() => toggleFilter(tag.key, tag.value)}
                        >
                            {tag.label}
                            <X className="h-3 w-3 ml-1.5 text-stone-400 hover:text-red-500" />
                        </Badge>
                    ))}
                </div>
            )}

            <Accordion
                type="multiple"
                className="w-full"
            >
                {filterConfigs.map(config => (
                    <AccordionItem
                        key={config.key}
                        value={config.key}
                        className="border-stone-200"
                    >
                        <AccordionTrigger className="text-base font-semibold text-stone-800 hover:no-underline hover:text-primary">
                            {config.label}
                        </AccordionTrigger>
                        <AccordionContent>
                            {config.type === "checkbox" && config.options && (
                                <div className="space-y-3 pt-2">
                                    {config.options.map(option => (
                                        <FilterCheckbox
                                            key={option.value}
                                            id={`mobile-${config.key}-${option.value}`}
                                            label={option.label}
                                            count={option.count}
                                            checked={((activeFilters[config.key] as string[]) || []).includes(option.value)}
                                            onChange={() => toggleFilter(config.key, option.value)}
                                        />
                                    ))}
                                </div>
                            )}
                            {config.type === "range" && (
                                <div className="pt-4 px-2 space-y-4">
                                    <Slider
                                        min={config.min || 0}
                                        max={config.max || 100}
                                        step={1}
                                        value={priceRange}
                                        onValueChange={(value) => setPriceRange(value as [number, number])}
                                        className="py-4"
                                    />
                                    <div className="flex items-center justify-between text-sm text-stone-600 font-medium">
                                        <span className="bg-stone-100 px-2 py-1 rounded">{priceRange[0]}€</span>
                                        <span className="text-stone-400">—</span>
                                        <span className="bg-stone-100 px-2 py-1 rounded">{priceRange[1]}€</span>
                                    </div>
                                </div>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

interface FilterCheckboxProps {
    id: string;
    label: string;
    count?: number;
    checked: boolean;
    onChange: () => void;
}

function FilterCheckbox({ id, label, count, checked, onChange }: FilterCheckboxProps) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex items-center space-x-3">
                <Checkbox
                    id={id}
                    checked={checked}
                    onCheckedChange={onChange}
                    className="border-stone-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                    htmlFor={id}
                    className="text-sm font-normal text-stone-600 cursor-pointer hover:text-stone-900 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {label}
                </Label>
            </div>
            {count !== undefined && (
                <span className="text-xs text-stone-400 group-hover:text-stone-500">
                    ({count})
                </span>
            )}
        </div>
    );
}

// Export a simpler version for backward compatibility
export function SimpleProductFilters() {
    return (
        <div className="text-sm text-stone-500 italic p-4 bg-stone-50 rounded-lg">
            Sélectionnez une catégorie pour voir les filtres disponibles.
        </div>
    );
}
