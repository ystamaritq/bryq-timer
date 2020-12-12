import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Timer from "./index";
import { defaultTimerColor, warningTimerColor } from "./utils";

jest.useRealTimers();
jest.setTimeout(10000);

afterEach(() => {
	jest.clearAllMocks();
});

const sleep = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

test("renders with default values", () => {
	const { container } = render(<Timer />);
	expect(container.getElementsByClassName("timerContainer").length).toBe(1);
	expect(container.getElementsByClassName("timerIcon").length).toBe(1);
	expect(container.getElementsByClassName("timerIconBackground").length).toBe(1);
	expect(container.getElementsByClassName("timerIconTime").length).toBe(1);
	expect(container.getElementsByClassName("timerText").length).toBe(1);
});

test("when no value is given it defaults to 0", () => {
	const { container } = render(<Timer />);
	expect(container.getElementsByClassName("timerText")[0]).toHaveTextContent("0:00");
});

test("formats multiple minutes and seconds", () => {
	const { container } = render(<Timer value={125} />);
	expect(container.getElementsByClassName("timerText")[0]).toHaveTextContent("2:05");
});

test("formats double digit seconds", () => {
	const { container } = render(<Timer value={25} />);
	expect(container.getElementsByClassName("timerText")[0]).toHaveTextContent("0:25");
});

test("formats single digit seconds", () => {
	const { container } = render(<Timer value={5} />);
	expect(container.getElementsByClassName("timerText")[0]).toHaveTextContent("0:05");
});

test("accepts onExpire property", async () => {
    const onExpire = jest.fn();

	act(() => {
		render(<Timer value={1} onExpire={onExpire} />);
	});

	const initialText = await screen.findAllByText("0:01");
	expect(initialText).toHaveLength(1);
	expect(onExpire).not.toHaveBeenCalled();

	await act(() => sleep(2000));

	const updatedText = await screen.findAllByText("0:00");
	expect(updatedText).toHaveLength(1);
	expect(onExpire).toHaveBeenCalled();
});

test("changes color when it has one quarter of the original seconds left", async () => {
	act(() => {
		render(<Timer value={4} />);
	});
	const container = await screen.findByTestId("timerContainer");
	expect(container).toHaveStyle(`background-color:${defaultTimerColor}`);
	await act(() => sleep(1000));
	expect(container).toHaveStyle(`background-color:${defaultTimerColor}`);
	await act(() => sleep(2000));
	expect(container).toHaveStyle(`background-color:${warningTimerColor}`);
});
