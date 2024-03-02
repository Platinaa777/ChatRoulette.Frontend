import {React, useEffect, useRef, useState } from 'react'
import * as signalR from "@microsoft/signalr";

export const ChatConnection = async () => {
    const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:8003/chat")
            .withAutomaticReconnect()
            .build();

    await connection.start()

    return connection;
}