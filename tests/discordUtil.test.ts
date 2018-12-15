import { Message, GuildChannel } from "discord.js";

import * as util from "../src/discordUtil";

jest.mock("discord.js");

const MessageType = <jest.Mock<Message>>Message;
const ChannelType = <jest.Mock<GuildChannel>>GuildChannel;

const { Collection } = require.requireActual("discord.js");

it("Parse Message to array without prefix", () => {
    const MockedMessage = MessageType.mockImplementation(() => {
        return {
            content: "$command          p1 p2 p3",
        };
    });
    const message = new MockedMessage();
    expect(util.parseMessage(message)).toEqual(["command", "p1", "p2", "p3"]);
});

it("Get Params from message without prefix as array", () => {
    const MockedMessage = MessageType.mockImplementation(() => {
        return {
            content: "command p1 p2 p3",
        };
    });
    const message = new MockedMessage();
    expect(util.getParams(message)).toEqual(["p1", "p2", "p3"]);
});

it("Find Channel in map by name", () => {
    const MockedChannel = ChannelType.mockImplementationOnce(() => {
        return {
            name: "channel to find",
        };
    });
    const MockedChannel1 = ChannelType.mockImplementationOnce(() => {
        return {
            name: "channel to not find",
        };
    });
    const channels = new Collection();
    channels.set("test1", new MockedChannel1());
    channels.set("channel name", new MockedChannel());

    expect(util.findChannel("channel to find", channels).name).toEqual("channel to find");
});

it("Find Channel in map by snowflake", () => {
    const MockedChannel1 = ChannelType.mockImplementationOnce(() => {
        return {
            id: "channel to not find",
        };
    });
    const MockedChannel = ChannelType.mockImplementationOnce(() => {
        return {
            id: "1234567890",
        };
    });
    const channels = new Collection();
    channels.set("test1", new MockedChannel1());
    channels.set("1234567890", new MockedChannel());

    expect(util.findChannel("<1234567890>", channels).id).toEqual("1234567890");
});