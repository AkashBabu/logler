import { expect } from "chai";
import path from "path";
import {stub} from "sinon";
import Logler from "../src";

describe("Logler", () => {

    describe("#colors", () => {
        const colorLogger = new Logler();

        colorLogger.trace("Colored log", {a: 1});
        colorLogger.debug("Colored log");
        colorLogger.info("Colored log");
        colorLogger.log("Colored log");
        colorLogger.warn("Colored log");
        colorLogger.error("Colored log");
        colorLogger.fatal("Colored log");

        const plainLogger = new Logler({
            colorLogs: false,
        });

        plainLogger.trace("Normal log", {a: 1});
        plainLogger.debug("Normal log");
        plainLogger.info("Normal log");
        plainLogger.log("Normal log");
        plainLogger.warn("Normal log");
        plainLogger.error("Normal log");
        plainLogger.fatal("Normal log");
    });

    describe("#format", () => {
        it("should format the log in the specified format", (done) => {
            const logger = new Logler({
                formatter: (tokens, level, msg) => `Hey ${msg}`,
                onLog(level, { msg }) {
                    expect(level).to.be.eq("debug");
                    expect(msg).to.be.eq("Hey test");

                    done();
                },
                writer: () => { },
            });

            logger.debug("test");
        });
    });

    describe("#onLog", () => {
        it("should be called when ever a log is made", (done) => {
            const logger = new Logler({
                serializer(...args) {
                    return args.join(" ");
                },
                formatter(tokens, level, msg) {
                    return msg;
                },
                onLog(level, {msg}) {
                    expect(level).to.be.eql("debug");
                    expect(msg).to.be.eql("test");
                    done();
                },
            });

            logger.debug("test");
        });
    });

    describe("#serializer", () => {
        it("should call serializer with the log arguments", () => {
            const logArgs = [1, "a", { a: 1 }];
            function serializer(...args: any[]) {
                logArgs.forEach((arg, i) => {
                    expect(arg).to.be.eql(args[i]);
                });
                return args.join(" ");
            }

            const logger = new Logler({
                serializer,
            });

            logger.debug(...logArgs);
        });
    });

    describe("#token", () => {
        it("should call every tokens for every log made", () => {
            const timestamp = stub();
            const id = stub();

            const logger = new Logler({
                tokens: {
                    timestamp,
                    id,
                },
            });

            logger.debug("test token");

            expect(timestamp.called).to.be.true;
            expect(id.called).to.be.true;
        });
        it("should call token with level and log arguments", () => {
            const token = stub();

            const logger = new Logler({
                tokens: {
                    token,
                },
            });

            logger.debug("test token");

            expect(token.calledWith("debug", "test token")).to.be.true;
        });

        it("should include mandatory tokens => fileName, lineNum, colNum", () => {
            const logger = new Logler({
                formatter({ filePath, fileName, lineNum, colNum }) {
                    expect(filePath).to.be.eql(__filename);
                    expect(fileName).to.be.eql(path.parse(__filename).base);
                    expect(lineNum).to.be.eql(129);
                    expect(colNum).to.be.eql(20);
                    return "";
                },
            });

            logger.debug("test token");
        });
    });

    describe("#writer", () => {
        it("should call the writer with the serialized msg string if one has been specified", (done) => {
            function writer(msg: string) {
                expect(msg).to.be.a("string");

                done();
            }

            const logger = new Logler({
                writer,
            });
            logger.debug("test");
        });
    });

});
