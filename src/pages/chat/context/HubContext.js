import {ConnectionProvider} from "./ConnectionContext";
import {EmailProvider} from "./EmailContext";
import {RoomProvider} from "./RoomContext";
import {ConnectionIdProvider} from "./ConnectionIdContext";

export function HubProvider ({children}) {
    return <ConnectionProvider>
        <ConnectionIdProvider>
            <EmailProvider>
                <RoomProvider>
                    {children}
                </RoomProvider>
            </EmailProvider>
        </ConnectionIdProvider>
    </ConnectionProvider>
}