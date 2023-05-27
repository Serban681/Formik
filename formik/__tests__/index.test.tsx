import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../src/pages/index'
import mockRouter from "next-router-mock"
import {BigBtn} from "@/components/Buttons";

jest.mock("next/router", () => require("next-router-mock"));

describe('Home', () => {
    it('renders landing page', () => {
        mockRouter.push("/dashboard");

        render(<Home />);

        expect(screen.getByTestId("index h1")).toBeInTheDocument();
        expect(screen.getByTestId("index h6")).toBeInTheDocument();
        expect(screen.getByText("Get Started")).toBeInTheDocument();
        expect(screen.getByText("What we provide")).toBeInTheDocument();
        expect(screen.getByTestId("card1h1")).toBeInTheDocument();
        expect(screen.getByTestId("card1h3")).toBeInTheDocument();
        expect(screen.getByTestId("card1ul")).toBeInTheDocument();
        expect(screen.getByTestId("li1")).toBeInTheDocument();
        expect(screen.getByTestId("li2")).toBeInTheDocument();
        expect(screen.getByTestId("li3")).toBeInTheDocument();
        expect(screen.getByTestId("card2h1")).toBeInTheDocument();
        expect(screen.getByTestId("card2p")).toBeInTheDocument();
        expect(screen.getByTestId("card3h1")).toBeInTheDocument();
        expect(screen.getByTestId("card3p")).toBeInTheDocument();

        fireEvent.click(screen.getByText("Get Started"));

        expect(mockRouter).toMatchObject({
            pathname: "/dashboard",
        });
    });
});