import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const manageCustomers = {
    id: '7',
    message: "In the Customers page you will see all details about the organization's existing customers. Also, in the Leads page you will find potential customers. In both pages, you can add, update and delete data as you wish.",
    trigger: 30
}

const marketingCampaing = {
    id: '8',
    message: "You can build your own email templates and use them to start marketing campaings within the 'customers' page. Marketing campaigns are useful to stay in touch with your customers and gain new ones.",
    trigger: 30
}

const addTask = {
    id: '9',
    message: "In the 'Tasks' page you can view, add, update and delete tasks within the organization, depeding on your role.",
    trigger: 30
}

const stats = { 
    id: '10',
    message: "In the 'Dashboard' page you will see all details related to the company's sales, displayed in charts.",
    trigger: 30
}

const sales = { 
    id: '11',
    message: "You can add, delete, view and modify organizational Deals/Transactions/Sales. The status of any deal (accepted, rejected, proposed) affects your personal and organizational points.",
    trigger: 30
}

const team = { 
    id: '12',
    message: "Depending on your role, you can invite, view and remove members from your team. The invitation code can be changed within the 'Organization' page",
    trigger: 30
}

const points = {
    id: '13',
    message: "Points are gained by organizations and users by closing deals with the status 'Accepted'. You can view your points and the leaderboard in your profile and team page.",
    trigger: 30
}

const steps = [
	{
		id: '0',
		message: 'Hi! 👋 ',
		trigger: '1',
	}, {
		id: '1',
		message: 'I am your CRM guide!',
		trigger: '2',
	}, {
		id: '2',
		message: "How can I help you?",
		trigger: 3
	}, {
		id: '3',
		options: [
			{ value: 1, label: 'View features', trigger: 4 },
			{ value: 2, label: 'Read Articles', trigger: 6 },
		],
	}, {
        id: '4',
        message: "NodeCRM has a planty of features! You can explore all of them below!",
        trigger: 5,
    }, {
        id: '5',
        options: [
            { value: 1, label: "Manage your customers", trigger: 7 },
            { value: 2, label: "Initiate a marketing campaign", trigger: 8 },
            { value: 3, label: "Add or perform tasks", trigger: 9 },
            { value: 4, label: "Visualize sales and customers statistics", trigger: 10 },
            { value: 5, label: "Manage your sales", trigger: 11 },
            { value: 6, label: "View or manage your team", trigger: 12 },
            { value: 7, label: "Points", trigger: 13 }
        ]
    }, {
        id: '6', 
        options: [
            { value: 1, label: "5 Ways a CRM Can Improve the Customer Experience", trigger: () => {
                window.open("https://www.benchmarkemail.com/blog/crm-improve-customer-experience/", "_blank"); // Redirect to the specified URL
                return '31'; // Return the next step ID
            } },
            { value: 2, label: "6 Creative Ways to Use Your CRM for More Than Sales", trigger: () => {
                window.open("https://www.benchmarkone.com/blog/crm-for-more-than-sales/", "_blank"); // Redirect to the specified URL
                return '31'; // Return the next step ID
            } },
            { value: 3, label: "6 Tips for a More Organized Small Business CRM", trigger: () => {
                window.open("https://www.benchmarkone.com/blog/organized-small-business-crm/", "_blank"); // Redirect to the specified URL
                return '31'; // Return the next step ID
            } },
            { value: 4, label: "Email and CRM: Where Marketing Automation Meets Personal Sales Follow-Ups",trigger: () => {
                window.open("https://www.benchmarkemail.com/blog/email-crm-marketing-automation/", "_blank"); // Redirect to the specified URL
                return '31'; // Return the next step ID
            } },
        ],
    }, {
        id: '30',
        options: [
			{ value: 1, label: 'View more features', trigger: 5 },
			{ value: 2, label: 'Read Articles', trigger: 6 },
		],
    },
    {
        id: '31',
        options: [
			{ value: 1, label: 'Read more Articles', trigger: 6 },
			{ value: 2, label: 'View features', trigger: 5 },
		],
    },
    manageCustomers, marketingCampaing, addTask, stats, sales, team, points,
];

// Creating our own theme
const theme = {
	background: '#fff',
	headerBgColor: '#384c5c',
	headerFontSize: '20px',
	botBubbleColor: '#93bad7',
	headerFontColor: 'white',
	botFontColor: 'white',
	userBubbleColor: '#c2d5e2',
	userFontColor: 'white',
};

// Set some properties of the bot
const config = {
	botAvatar: "https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg?w=740&t=st=1713691773~exp=1713692373~hmac=12fb406746e96a985e2df62c5083dfc75b6acbdf760e25efee910da9d547a7f7",
	floating: true, 
};

export default function ReactSimpleChatbot() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<ChatBot

					// This appears as the header
					// text for the chat bot
					headerTitle="NodeBot"
					steps={steps}
					{...config}

				/>
			</ThemeProvider>
		</div>
	);
};
