import ProjectSchema from "../model/ProjectSchema.js";
import registerdataschema from "../model/registerdataschema.js";




export const getalluserprojectinfo = async (req, res) => {
    try {
        const { email, userlevel } = req.params;

        // Find the user by email
        const user = await registerdataschema.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }

        const dept = user.dept;

        // Find projects by department and populate the required fields
        const projects = await ProjectSchema.find({ department: dept })
            .populate({
                path: 'task_list',
                populate: {
                    path: 'deliverable_info',
                    populate: {
                        path: 'sub_deliverable_info'
                    }
                }
            });

        // Create the response in the desired format
        const response = {
            result: projects.map(project => ({
                _id: project._id,
                department: project.department,
                project_name: project.project_name,
                client_name: project.client_name,
                project_status: project.project_status,
                project_type: project.project_type,
                task_list: project.task_list.map(task => ({
                    _id: task._id,
                    vertical_name: task.vertical_name,
                    service_name: task.service_name,
                    deliverable_info: task.deliverable_info.map(deliverable => ({
                        _id: deliverable._id,
                        deliverable_name: deliverable.deliverable_name,
                        sub_deliverable_info: deliverable.sub_deliverable_info.map(subDeliverable => ({
                            selected_user: subDeliverable.selected_user,
                            _id: subDeliverable._id,
                            sub_deliverable_name: subDeliverable.sub_deliverable_name,
                            subdeliverable_no: subDeliverable.subdeliverable_no
                        })),
                        deliverable_category: deliverable.deliverable_category,
                        deliverable_no: deliverable.deliverable_no,
                        is_selected: deliverable.is_selected,
                        isdeliverable: deliverable.isdeliverable
                    })),
                    is_checked: task.is_checked
                }))
            })),
            projectList:projects.map(project=>({
                project_name: project.project_name,
                task_list: project.task_list.flatMap(task =>
                    task.deliverable_info.map(deliverable => ({
                        deliverableName: deliverable.deliverable_name,
                        plannedHours: deliverable.planned_hours,
                        actualHours: deliverable.actual_hours,
                        plannedCost: deliverable.planned_cost,
                        timeSpent: deliverable.time_spent,
                        subDeliverables: deliverable.sub_deliverable_info.map(sub => ({
                            subDeliverableName: sub.sub_deliverable_name,
                            plannedHours: sub.planned_hours,
                            actualHours: sub.actual_hours,
                            plannedCost: sub.planned_cost,
                            timeSpent: sub.time_spent
                        }))
                    }))
                )
        

            }))
        };

        res.json({
            "result": [
                {
                    "_id": "660b9bf5cef91c3a443c581d",
                    "department": [
                        "IT"
                    ],
                    "project_name": "HP - Inakkam Tool",
                    "client_name": "HP International Engineering",
                    "project_status": "Active",
                    "project_type": "Office",
                    "task_list": [
                        {
                            "_id": "660e7c0215036e04dfb82248",
                            "vertical_name": "IT",
                            "service_name": "Web Development",
                            "deliverable_info": [
                                {
                                    "_id": "660e7c0215036e04dfb82249",
                                    "deliverable_name": "Requirement Gathering",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [
                                                "test"
                                            ],
                                            "_id": "660e7c0215036e04dfb82250",
                                            "sub_deliverable_name": "Tool Logic Preparation",
                                            "subdeliverable_no": "1"
                                        },
                                        {
                                            "selected_user": [
                                                "test"
                                            ],
                                            "_id": "660e7c0215036e04dfb82251",
                                            "sub_deliverable_name": "Vendor Followup",
                                            "subdeliverable_no": "2"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82252",
                                            "sub_deliverable_name": "Database Data Preparation",
                                            "subdeliverable_no": "3"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82352",
                                            "sub_deliverable_name": "Tool Testing",
                                            "subdeliverable_no": "4"
                                        }
                                    ],
                                    "deliverable_category": "Requirement Gathering",
                                    "deliverable_no": 1,
                                    "is_selected": true,
                                    "isdeliverable": false
                                },
                                {
                                    "_id": "660e7c0215036e04dfb82253",
                                    "deliverable_name": "Design",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82254",
                                            "sub_deliverable_name": "Requirement Gathered from SME",
                                            "subdeliverable_no": "1"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82255",
                                            "sub_deliverable_name": "UX-UI Design",
                                            "subdeliverable_no": "2"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82256",
                                            "sub_deliverable_name": "UX-UI Testing",
                                            "subdeliverable_no": "3"
                                        }
                                    ],
                                    "deliverable_category": "Design",
                                    "deliverable_no": 2,
                                    "is_selected": true,
                                    "isdeliverable": true
                                },
                                {
                                    "_id": "660e7c0215036e04dfb82257",
                                    "deliverable_name": "Development",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82258",
                                            "sub_deliverable_name": "Requirement Gathered from SME",
                                            "subdeliverable_no": "1"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82259",
                                            "sub_deliverable_name": "New Logic",
                                            "subdeliverable_no": "2"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82260",
                                            "sub_deliverable_name": "Logic Update",
                                            "subdeliverable_no": "3"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82261",
                                            "sub_deliverable_name": "Comments & Bugs",
                                            "subdeliverable_no": "4"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82262",
                                            "sub_deliverable_name": "Unit Testing",
                                            "subdeliverable_no": "5"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82263",
                                            "sub_deliverable_name": "Code Review",
                                            "subdeliverable_no": "6"
                                        }
                                    ],
                                    "deliverable_category": "Development",
                                    "deliverable_no": 3,
                                    "is_selected": true,
                                    "isdeliverable": true
                                },
                                {
                                    "_id": "660e7c0215036e04dfb82262",
                                    "deliverable_name": "Deployment",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82263",
                                            "sub_deliverable_name": "Server Setup",
                                            "subdeliverable_no": "1"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82264",
                                            "sub_deliverable_name": "Domain Configuration",
                                            "subdeliverable_no": "2"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb83264",
                                            "sub_deliverable_name": "Code Deployment",
                                            "subdeliverable_no": "3"
                                        }
                                    ],
                                    "deliverable_category": "Deployment",
                                    "deliverable_no": 4,
                                    "is_selected": true,
                                    "isdeliverable": false
                                }
                            ],
                            "is_checked": false
                        },
                        {
                            "_id": "660e7e5a15036e04dfb82249",
                            "vertical_name": "IT",
                            "service_name": "IoT Development",
                            "deliverable_info": [
                                {
                                    "_id": "660e7c0215036e04dfb82265",
                                    "deliverable_name": "IoT Device",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82266",
                                            "sub_deliverable_name": "Device Vendor Followup"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82267",
                                            "sub_deliverable_name": "Gateway Setup"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82268",
                                            "sub_deliverable_name": "Gateway Testing"
                                        }
                                    ],
                                    "deliverable_category": "IoT Device",
                                    "deliverable_no": 1,
                                    "is_selected": true
                                },
                                {
                                    "_id": "660e7c0215036e04dfb82249",
                                    "deliverable_name": "Requirement Gathering",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82250",
                                            "sub_deliverable_name": "Tool Logic Preparation"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82251",
                                            "sub_deliverable_name": "Vendor Followup"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82252",
                                            "sub_deliverable_name": "Database Data Preparation"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb83352",
                                            "sub_deliverable_name": "Tool Testing"
                                        }
                                    ],
                                    "deliverable_category": "Requirement Gathering",
                                    "deliverable_no": 2,
                                    "is_selected": true
                                },
                                {
                                    "_id": "660e7c0215036e04dfb82253",
                                    "deliverable_name": "Design",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82254",
                                            "sub_deliverable_name": "Requirement Gathered from SME"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82255",
                                            "sub_deliverable_name": "UX-UI Design"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82256",
                                            "sub_deliverable_name": "UX-UI Testing"
                                        }
                                    ],
                                    "deliverable_category": "Design",
                                    "deliverable_no": 3,
                                    "is_selected": true
                                },
                                {
                                    "_id": "660e7c0215036e04dfb82257",
                                    "deliverable_name": "Development",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82258",
                                            "sub_deliverable_name": "Requirement Gathered from SME"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82259",
                                            "sub_deliverable_name": "New Logic"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82260",
                                            "sub_deliverable_name": "Logic update"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82261",
                                            "sub_deliverable_name": "Comments & Bugs"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e05dfb82260",
                                            "sub_deliverable_name": "Code Unit Testing"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e05dfb82261",
                                            "sub_deliverable_name": "Code Review"
                                        }
                                    ],
                                    "deliverable_category": "Development",
                                    "deliverable_no": 4,
                                    "is_selected": true
                                },
                                {
                                    "_id": "660e7c0215036e04dfb82262",
                                    "deliverable_name": "Deployment",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82263",
                                            "sub_deliverable_name": "Server Setup"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82264",
                                            "sub_deliverable_name": "Domain Configuration"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb83264",
                                            "sub_deliverable_name": "Code Deployment"
                                        }
                                    ],
                                    "deliverable_category": "Deployment",
                                    "deliverable_no": 5,
                                    "is_selected": true
                                }
                            ],
                            "is_checked": false
                        },
                        {
                            "_id": "660e80ed15036e04dfb8224a",
                            "vertical_name": "IT",
                            "service_name": "Electrical Data Entry",
                            "deliverable_info": [
                                {
                                    "_id": "661e80ed15036e04dfb8225a",
                                    "deliverable_name": "DB",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "662e80ed15036e04dfb8225a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "663e80ed15036e04dfb8225a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "664e80ed15036e04dfb8225a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "DB",
                                    "deliverable_no": 1,
                                    "is_selected": true
                                },
                                {
                                    "_id": "665e80ed15036e04dfb8225a",
                                    "deliverable_name": "LIGHT FIXTURE / CONTROLS",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "666e80ed15036e04dfb8225a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "667e80ed15036e04dfb8225a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "668e80ed15036e04dfb8225a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "LIGHT FIXTURE / CONTROLS",
                                    "deliverable_no": 2,
                                    "is_selected": true
                                },
                                {
                                    "_id": "665e80ed16036e04dfb8225a",
                                    "deliverable_name": "SOCKETS AND SWITCHES",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "665e80ed17036e04dfb8225a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "665e80ed18036e04dfb8225a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "665e80ed19036e04dfb8225a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "SOCKETS AND SWITCHES",
                                    "deliverable_no": 3,
                                    "is_selected": true
                                },
                                {
                                    "_id": "665e80ed16136e04dfb8225a",
                                    "deliverable_name": "POWER CABLE",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "665e80ed16236e04dfb8225a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "665e80ed16336e04dfb8225a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "665e80ed16436e04dfb8225a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "POWER CABLE",
                                    "deliverable_no": 4,
                                    "is_selected": true
                                },
                                {
                                    "_id": "665e80ed16137e04dfb8225a",
                                    "deliverable_name": "WIRING",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "665e80ed16138e04dfb8225a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "665e80ed16139e04dfb8225a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "665e80ed16140e04dfb8225a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "WIRING",
                                    "deliverable_no": 5,
                                    "is_selected": true
                                },
                                {
                                    "_id": "660e80ed15036e04dfb8225a",
                                    "deliverable_name": "PANEL SUBMITTALS",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15036e04dfb8227a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15036e04dfb8228a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15036e04dfb8229a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "PANEL SUBMITTALS",
                                    "deliverable_no": 6,
                                    "is_selected": true
                                },
                                {
                                    "_id": "660e80ed15036e04dfb8226a",
                                    "deliverable_name": "RACEWAYS / CONDUITS",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15036e04dfb8227a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15036e04dfb8228a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15036e04dfb8229a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "RACEWAYS / CONDUITS",
                                    "deliverable_no": 7,
                                    "is_selected": true
                                },
                                {
                                    "_id": "660e80ed15036e04dfb7226a",
                                    "deliverable_name": "CABLE TRAY",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15036e04dfb8226a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15036e04dfb9226a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15036e04dfb9236a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "CABLE TRAY",
                                    "deliverable_no": 8,
                                    "is_selected": true
                                },
                                {
                                    "_id": "660e80ed15036e05dfb7226a",
                                    "deliverable_name": "UPS",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15046e05dfb7226a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15056e05dfb7226a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15066e05dfb7226a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "UPS",
                                    "deliverable_no": 9,
                                    "is_selected": true
                                },
                                {
                                    "_id": "760e80ed15036e05dfb7226a",
                                    "deliverable_name": "BREAKERS / ISOLATORS",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "761e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "762e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "763e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "BREAKERS / ISOLATORS",
                                    "deliverable_no": 10,
                                    "is_selected": true
                                },
                                {
                                    "_id": "764e80ed15036e05dfb7226a",
                                    "deliverable_name": "BBT & TAP OFF BOX",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "765e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "766e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "767e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "BBT & TAP OFF BOX",
                                    "deliverable_no": 11,
                                    "is_selected": true
                                },
                                {
                                    "_id": "768e80ed15036e05dfb7226a",
                                    "deliverable_name": "EARTHING",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "769e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "770e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "771e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "EARTHING",
                                    "deliverable_no": 12,
                                    "is_selected": true
                                },
                                {
                                    "_id": "772e80ed15036e05dfb7226a",
                                    "deliverable_name": "TEMPORARY POWER SUPPLY",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "773e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "774e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "775e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "TEMPORARY POWER SUPPLY",
                                    "deliverable_no": 13,
                                    "is_selected": true
                                },
                                {
                                    "_id": "776e80ed15036e05dfb7226a",
                                    "deliverable_name": "SAFETY ACCESSORIES",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "776e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "778e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "779e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "SAFETY ACCESSORIES",
                                    "deliverable_no": 14,
                                    "is_selected": true
                                }
                            ],
                            "is_checked": false
                        },
                        {
                            "_id": "660e96d615036e04dfb8225a",
                            "vertical_name": "IT",
                            "service_name": "General",
                            "deliverable_info": [
                                {
                                    "_id": "6627b2a8886d7af843c0bc95",
                                    "deliverable_name": "General",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15036e04dfb8226a",
                                            "sub_deliverable_name": "Leave"
                                        }
                                    ],
                                    "deliverable_category": "General",
                                    "deliverable_no": 1,
                                    "is_selected": true
                                }
                            ],
                            "is_checked": false
                        },
                        {
                            "_id": "662634828ddeca30fcb79de1",
                            "vertical_name": "IT",
                            "service_name": "HVAC Data Entry",
                            "deliverable_info": [
                                {
                                    "_id": "661e80ed15036e04dfb8225a",
                                    "deliverable_name": "Dell Crystal Down",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "662e80ed15036e04dfb8225a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "663e80ed15036e04dfb8225a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "664e80ed15036e04dfb8225a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "Dell Crystal Down",
                                    "deliverable_no": 1,
                                    "is_selected": true
                                },
                                {
                                    "_id": "665e80ed15036e04dfb8225a",
                                    "deliverable_name": "CTS Ozone Academy",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "666e80ed15036e04dfb8225a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "667e80ed15036e04dfb8225a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "668e80ed15036e04dfb8225a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "CTS Ozone Academy",
                                    "deliverable_no": 2,
                                    "is_selected": true
                                },
                                {
                                    "_id": "665e80ed16036e04dfb8225a",
                                    "deliverable_name": "Dell RSA",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "665e80ed17036e04dfb8225a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "665e80ed18036e04dfb8225a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "665e80ed19036e04dfb8225a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "Dell RSA",
                                    "deliverable_no": 3,
                                    "is_selected": true
                                },
                                {
                                    "_id": "665e80ed16136e04dfb8225a",
                                    "deliverable_name": "EY Bangalore",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "665e80ed16236e04dfb8225a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "665e80ed16336e04dfb8225a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "665e80ed16436e04dfb8225a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "EY Bangalore",
                                    "deliverable_no": 4,
                                    "is_selected": true
                                },
                                {
                                    "_id": "665e80ed16137e04dfb8225a",
                                    "deliverable_name": "Mearsk",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "665e80ed16138e04dfb8225a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "665e80ed16139e04dfb8225a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "665e80ed16140e04dfb8225a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "Mearsk",
                                    "deliverable_no": 5,
                                    "is_selected": true
                                },
                                {
                                    "_id": "660e80ed15036e04dfb8225a",
                                    "deliverable_name": "NCR at Hyderabad",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15036e04dfb8227a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15036e04dfb8228a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15036e04dfb8229a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "NCR at Hyderabad",
                                    "deliverable_no": 6,
                                    "is_selected": true
                                },
                                {
                                    "_id": "660e80ed15036e04dfb8226a",
                                    "deliverable_name": "PAYODA-MEP",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15036e04dfb8227a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15036e04dfb8228a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15036e04dfb8229a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "PAYODA-MEP",
                                    "deliverable_no": 7,
                                    "is_selected": true
                                },
                                {
                                    "_id": "660e80ed15036e04dfb7226a",
                                    "deliverable_name": "Savills - Bengaluru",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15036e04dfb8226a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15036e04dfb9226a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15036e04dfb9236a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "Savills - Bengaluru",
                                    "deliverable_no": 8,
                                    "is_selected": true
                                },
                                {
                                    "_id": "660e80ed15036e05dfb7226a",
                                    "deliverable_name": "Sew Eurodrive",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15046e05dfb7226a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15056e05dfb7226a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15066e05dfb7226a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "Sew Eurodrive",
                                    "deliverable_no": 9,
                                    "is_selected": true
                                },
                                {
                                    "_id": "760e80ed15036e05dfb7226a",
                                    "deliverable_name": "TCL Bangalore",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "761e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "762e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "763e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "TCL Bangalore",
                                    "deliverable_no": 10,
                                    "is_selected": true
                                },
                                {
                                    "_id": "764e80ed15036e05dfb7226a",
                                    "deliverable_name": "Toyota IITMRP",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "765e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "766e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "767e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "Toyota IITMRP",
                                    "deliverable_no": 11,
                                    "is_selected": true
                                },
                                {
                                    "_id": "768e80ed15036e05dfb7226a",
                                    "deliverable_name": "TVS Mumbai",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "769e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "770e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "771e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "TVS Mumbai",
                                    "deliverable_no": 12,
                                    "is_selected": true
                                },
                                {
                                    "_id": "772e80ed15036e05dfb7226a",
                                    "deliverable_name": "HPE",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "773e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "774e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "775e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "HPE",
                                    "deliverable_no": 13,
                                    "is_selected": true
                                },
                                {
                                    "_id": "776e80ed15036e05dfb7226a",
                                    "deliverable_name": "Pfizer",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "776e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Project Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "778e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Technical Data"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "779e80ed15036e05dfb7226a",
                                            "sub_deliverable_name": "Spatial Data"
                                        }
                                    ],
                                    "deliverable_category": "Pfizer",
                                    "deliverable_no": 14,
                                    "is_selected": true
                                }
                            ],
                            "is_checked": true
                        }
                    ],
                    "checked": true,
                    "is_selected": true,
                    "client_status": true,
                    "s_no": 1
                },
                {
                    "_id": "660e8abd4722c346559336a7",
                    "department": [
                        "IT"
                    ],
                    "project_name": "Timesheet Application",
                    "client_name": "Internal",
                    "project_status": "Active",
                    "project_type": "Office",
                    "task_list": [
                        {
                            "_id": "660e7c0215036e04dfb82248",
                            "vertical_name": "IT",
                            "service_name": "Web Development",
                            "deliverable_info": [
                                {
                                    "_id": "660e7c0215036e04dfb82249",
                                    "deliverable_name": "Requirement Gathering",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [
                                                "test"
                                            ],
                                            "_id": "660e7c0215036e04dfb82250",
                                            "sub_deliverable_name": "Tool Logic Preparation",
                                            "subdeliverable_no": "1"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82251",
                                            "sub_deliverable_name": "Vendor Followup",
                                            "subdeliverable_no": "2"
                                        },
                                        {
                                            "selected_user": [
                                                "test"
                                            ],
                                            "_id": "660e7c0215036e04dfb82252",
                                            "sub_deliverable_name": "Database Data Preparation",
                                            "subdeliverable_no": "3"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82352",
                                            "sub_deliverable_name": "Tool Testing",
                                            "subdeliverable_no": "4"
                                        }
                                    ],
                                    "deliverable_category": "Requirement Gathering",
                                    "deliverable_no": 1,
                                    "isdeliverable": false,
                                    "is_selected": true,
                                    "actual_hours": "0:00",
                                    "planned_hours": "0:00",
                                    "planned_cost": "0.00"
                                },
                                {
                                    "_id": "660e7c0215036e04dfb82253",
                                    "deliverable_name": "Design",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82254",
                                            "sub_deliverable_name": "Requirement Gathered from SME",
                                            "subdeliverable_no": "1"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82255",
                                            "sub_deliverable_name": "UX-UI Design",
                                            "subdeliverable_no": "2"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82256",
                                            "sub_deliverable_name": "UX-UI Testing",
                                            "subdeliverable_no": "3"
                                        }
                                    ],
                                    "deliverable_category": "Design",
                                    "deliverable_no": 2,
                                    "isdeliverable": true,
                                    "is_selected": true,
                                    "actual_hours": "0:00",
                                    "planned_hours": "0:00",
                                    "planned_cost": "0.00"
                                },
                                {
                                    "_id": "660e7c0215036e04dfb82257",
                                    "deliverable_name": "Development",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82258",
                                            "sub_deliverable_name": "Requirement Gathered from SME",
                                            "subdeliverable_no": "1"
                                        },
                                        {
                                            "selected_user": [
                                                "test"
                                            ],
                                            "_id": "660e7c0215036e04dfb82259",
                                            "sub_deliverable_name": "New Logic",
                                            "subdeliverable_no": "2"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82260",
                                            "sub_deliverable_name": "Logic Update",
                                            "subdeliverable_no": "3"
                                        },
                                        {
                                            "selected_user": [
                                                "test"
                                            ],
                                            "_id": "660e7c0215036e04dfb82261",
                                            "sub_deliverable_name": "Comments & Bugs",
                                            "subdeliverable_no": "4"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82262",
                                            "sub_deliverable_name": "Unit Testing",
                                            "subdeliverable_no": "5"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82263",
                                            "sub_deliverable_name": "Code Review",
                                            "subdeliverable_no": "6"
                                        }
                                    ],
                                    "deliverable_category": "Development",
                                    "deliverable_no": 3,
                                    "isdeliverable": false,
                                    "is_selected": true,
                                    "actual_hours": "0:00",
                                    "planned_hours": "0:00",
                                    "planned_cost": "0.00"
                                },
                                {
                                    "_id": "660e7c0215036e04dfb82262",
                                    "deliverable_name": "Deployment",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82263",
                                            "sub_deliverable_name": "Server Setup",
                                            "subdeliverable_no": "1"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82264",
                                            "sub_deliverable_name": "Domain Configuration",
                                            "subdeliverable_no": "2"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb83264",
                                            "sub_deliverable_name": "Code Deployment",
                                            "subdeliverable_no": "3"
                                        }
                                    ],
                                    "deliverable_category": "Deployment",
                                    "deliverable_no": 4,
                                    "isdeliverable": true,
                                    "is_selected": true,
                                    "actual_hours": "0:00",
                                    "planned_hours": "0:00",
                                    "planned_cost": "0.00"
                                }
                            ],
                            "is_checked": true
                        },
                        {
                            "_id": "660e96d615036e04dfb8225a",
                            "vertical_name": "IT",
                            "service_name": "General",
                            "deliverable_info": [
                                {
                                    "_id": "66419ee5448ee24c9f88fbf8",
                                    "deliverable_name": "General",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15036e04dfb8226a",
                                            "sub_deliverable_name": "Leave",
                                            "subdeliverable_status": false,
                                            "subdeliverable_no": "1"
                                        }
                                    ],
                                    "deliverable_category": "General",
                                    "isdeliverable": false,
                                    "is_selected": true,
                                    "deliverable_no": 1
                                }
                            ],
                            "is_checked": false
                        }
                    ],
                    "checked": true,
                    "is_selected": true,
                    "client_status": true,
                    "s_no": 2
                },
                {
                    "_id": "6610e506ac6fd21f288aad80",
                    "department": [
                        "IT"
                    ],
                    "project_name": "Enthiran Tool",
                    "client_name": "Internal",
                    "project_status": "Active",
                    "project_type": "Office",
                    "task_list": [
                        {
                            "_id": "660e7c0215036e04dfb82248",
                            "vertical_name": "IT",
                            "service_name": "Web Development",
                            "deliverable_info": [
                                {
                                    "_id": "660e7c0215036e04dfb82249",
                                    "deliverable_name": "Requirement Gathering",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [
                                                "test"
                                            ],
                                            "_id": "660e7c0215036e04dfb82250",
                                            "sub_deliverable_name": "Tool Logic Preparation",
                                            "subdeliverable_no": "1"
                                        },
                                        {
                                            "selected_user": [
                                                "test"
                                            ],
                                            "_id": "660e7c0215036e04dfb82251",
                                            "sub_deliverable_name": "Vendor Followup",
                                            "subdeliverable_no": "2"
                                        },
                                        {
                                            "selected_user": [
                                                "test"
                                            ],
                                            "_id": "660e7c0215036e04dfb82252",
                                            "sub_deliverable_name": "Database Data Preparation",
                                            "subdeliverable_no": "3"
                                        },
                                        {
                                            "selected_user": [
                                                "test"
                                            ],
                                            "_id": "660e7c0215036e04dfb82352",
                                            "sub_deliverable_name": "Tool Testing",
                                            "subdeliverable_no": "4"
                                        }
                                    ],
                                    "deliverable_category": "Requirement Gathering",
                                    "deliverable_no": 1,
                                    "isdeliverable": false,
                                    "is_selected": true,
                                    "actual_hours": "0:00",
                                    "planned_hours": "0:00",
                                    "planned_cost": "0.00"
                                },
                                {
                                    "_id": "660e7c0215036e04dfb82253",
                                    "deliverable_name": "Design",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82254",
                                            "sub_deliverable_name": "Requirement Gathered from SME",
                                            "subdeliverable_no": "1"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82255",
                                            "sub_deliverable_name": "UX-UI Design",
                                            "subdeliverable_no": "2"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82256",
                                            "sub_deliverable_name": "UX-UI Testing",
                                            "subdeliverable_no": "3"
                                        }
                                    ],
                                    "deliverable_category": "Design",
                                    "deliverable_no": 2,
                                    "isdeliverable": false,
                                    "is_selected": true,
                                    "actual_hours": "0:00",
                                    "planned_hours": "0:00",
                                    "planned_cost": "0.00"
                                },
                                {
                                    "_id": "660e7c0215036e04dfb82257",
                                    "deliverable_name": "Development",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82258",
                                            "sub_deliverable_name": "Requirement Gathered from SME",
                                            "subdeliverable_no": "1"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82259",
                                            "sub_deliverable_name": "New Logic",
                                            "subdeliverable_no": "2"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82260",
                                            "sub_deliverable_name": "Logic Update",
                                            "subdeliverable_no": "3"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82261",
                                            "sub_deliverable_name": "Comments & Bugs",
                                            "subdeliverable_no": "4"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82262",
                                            "sub_deliverable_name": "Unit Testing",
                                            "subdeliverable_no": "5"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82263",
                                            "sub_deliverable_name": "Code Review",
                                            "subdeliverable_no": "6"
                                        }
                                    ],
                                    "deliverable_category": "Development",
                                    "deliverable_no": 3,
                                    "isdeliverable": true,
                                    "is_selected": true,
                                    "actual_hours": "0:00",
                                    "planned_hours": "0:00",
                                    "planned_cost": "0.00"
                                },
                                {
                                    "_id": "660e7c0215036e04dfb82262",
                                    "deliverable_name": "Deployment",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82263",
                                            "sub_deliverable_name": "Server Setup",
                                            "subdeliverable_no": "1"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb82264",
                                            "sub_deliverable_name": "Domain Configuration",
                                            "subdeliverable_no": "2"
                                        },
                                        {
                                            "selected_user": [],
                                            "_id": "660e7c0215036e04dfb83264",
                                            "sub_deliverable_name": "Code Deployment",
                                            "subdeliverable_no": "3"
                                        }
                                    ],
                                    "deliverable_category": "Deployment",
                                    "deliverable_no": 4,
                                    "isdeliverable": true,
                                    "is_selected": true,
                                    "actual_hours": "0:00",
                                    "planned_hours": "0:00",
                                    "planned_cost": "0.00"
                                }
                            ],
                            "is_checked": true
                        },
                        {
                            "_id": "660e96d615036e04dfb8225a",
                            "vertical_name": "IT",
                            "service_name": "General",
                            "deliverable_info": [
                                {
                                    "_id": "66419e97448ee24c9f88fbbf",
                                    "deliverable_name": "General",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15036e04dfb8226a",
                                            "sub_deliverable_name": "Leave",
                                            "subdeliverable_no": "1"
                                        }
                                    ],
                                    "deliverable_category": "General",
                                    "deliverable_no": 1,
                                    "isdeliverable": false,
                                    "is_selected": true
                                }
                            ],
                            "is_checked": false
                        }
                    ],
                    "checked": true,
                    "is_selected": true,
                    "client_status": true,
                    "s_no": 3
                },
                {
                    "_id": "660e98fffe64b988813559ee",
                    "department": [
                        "IT"
                    ],
                    "project_name": "IT - General",
                    "client_name": "Internal",
                    "project_status": "Active",
                    "project_type": "Office",
                    "task_list": [
                        {
                            "_id": "660e96d615036e04dfb8225a",
                            "vertical_name": "IT",
                            "service_name": "General",
                            "deliverable_info": [
                                {
                                    "_id": "660e98ff7036e07942fe9e78",
                                    "deliverable_name": "General",
                                    "sub_deliverable_info": [
                                        {
                                            "selected_user": [],
                                            "_id": "660e80ed15036e04dfb8226a",
                                            "sub_deliverable_name": "Leave",
                                            "subdeliverable_no": "1"
                                        },
                                        {
                                            "selected_user": [
                                                "test"
                                            ],
                                            "_id": "660e80ed15036e04dfb8227a",
                                            "sub_deliverable_name": "Meeting",
                                            "subdeliverable_no": "2"
                                        }
                                    ],
                                    "deliverable_category": "General",
                                    "deliverable_no": 1,
                                    "is_selected": true,
                                    "planned_hours": "0:00",
                                    "planned_cost": "0.00",
                                    "isdeliverable": false
                                }
                            ],
                            "is_checked": false
                        }
                    ],
                    "checked": true,
                    "is_selected": true,
                    "client_status": true,
                    "s_no": 4
                }
            ],
            "projectList": [
                {
                    "project_name": "Enthiran Tool",
                    "time_spent": "14:00",
                    "billable_status": "true",
                    "deliverable_name": "Design",
                    "department": [
                        "IT"
                    ],
                    "is_selected": true,
                    "client_name": "Internal",
                    "project_status": "Active"
                },
                {
                    "project_name": "HP - Inakkam Tool",
                    "time_spent": "20:00",
                    "billable_status": "true",
                    "deliverable_name": "Development",
                    "department": [
                        "IT"
                    ],
                    "is_selected": true,
                    "client_name": "HP International Engineering",
                    "project_status": "Active"
                },
                {
                    "project_name": "IT - General",
                    "time_spent": "45:00",
                    "billable_status": "true",
                    "deliverable_name": "General",
                    "department": [
                        "IT"
                    ],
                    "is_selected": true,
                    "client_name": "Internal",
                    "project_status": "Active"
                },
                {
                    "project_name": "Timesheet Application",
                    "time_spent": "2:00",
                    "deliverable_name": "Requirement Gathering",
                    "department": [
                        "IT"
                    ],
                    "is_selected": true,
                    "client_name": "Internal",
                    "project_status": "Active"
                }
            ]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
