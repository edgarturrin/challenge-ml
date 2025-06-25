package com.challenge.api.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ProductDetail {

    @JsonProperty("id")
    private String id;

    @JsonProperty("title")
    private String title;

    @JsonProperty("price")
    private int price;

    @JsonProperty("discount")
    private int discount;

    @JsonProperty("installments")
    private String installments;

    @JsonProperty("stock")
    private int stock;

    @JsonProperty("preferred_image")
    private String preferredImage;

    @JsonProperty("images")
    private String[] images;

    @JsonProperty("color")
    private String color;

    @JsonProperty("memory")
    private String memory;

    @JsonProperty("description")
    private String description;

    @JsonProperty("features")
    private Feature[] features;

    @JsonProperty("payment_methods")
    private PaymentMethods paymentMethods;

    @JsonProperty("seller")
    private Seller seller;

    @Data
    public static class Seller {
        @JsonProperty("id")
        private String id;

        @JsonProperty("name")
        private String name;

        @JsonProperty("image")
        private String image;

        @JsonProperty("rating")
        private int rating;

        @JsonProperty("reputation")
        private Reputation reputation;

        @JsonProperty("is_official_store")
        private Boolean isOfficialStore;

        @Data
        public static class Reputation {
            @JsonProperty("level")
            private String level;

            @JsonProperty("transactions_completed")
            private int transactionsCompleted;

            @JsonProperty("rating")
            private double rating;

        }
    }

    @Data
    public static class Feature {
        @JsonProperty("label")
        private String label;
        @JsonProperty("value")
        private String value;
    }

    @Data
    public static class PaymentMethods {
        @JsonProperty("installments_bold")
        private String installmentsBold;

        @JsonProperty("cardless_installments")
        private CardlessInstallments[] cardlessInstallments;

        @JsonProperty("credit_cards")
        private Card[] creditCards;

        @JsonProperty("debit_cards")
        private Card[] debitCards;

        @JsonProperty("more")
        private String more;

        @Data
        public static class CardlessInstallments {
            @JsonProperty("name")
            private String name;

            @JsonProperty("logo")
            private String logo;
        }

        @Data
        public static class Card {
            @JsonProperty("name")
            private String name;

            @JsonProperty("logo")
            private String logo;
        }
    }
}
