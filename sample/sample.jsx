import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PopoverContent } from 'react-bootstrap';
import { IconButton } from '@material-ui/core';
import { Link as LinkIcon, DeleteOutlined, Info } from '@material-ui/icons';
import FlagIcon from '@material-ui/icons/Flag';
import { makeStyles } from '@material-ui/core/styles';
import Tour from 'reactour';
import AddIcon from '@material-ui/icons/Add';

import {
  getAllTasksRequest,
  bulkDeleteData,
  bulkAddTasks,
  bulkUpdateTasks,
  setFilterValues,
  setIfFilter,
} from '../../actions/taskActions';
import {
  formatDate,
  getTime,
  isValid,
  getTimeFromDate,
} from '../../helpers/datehelper';
import variables from '../../assets/partials/_variables.scss';
import { getAllAgents } from '../../actions/user_package_actions';
import { generatePDF } from '../../actions/reportsActions';
import { getAllMilestones } from '../../actions/milestoneActions';
import { getPackageListRequest } from '../../actions/packageActions';
import CustomButton from '../common/CustomButton';
import CustomSpinner from '../common/CustomSpinner';
import AgTable from '../common/AgTable';
import SelectEditor from './SelectEditor';
import AssignTaskResponsibility from './AssignTaskResponsibility';
import AssignCategoryResponsibilty from './AssignCategoryResponsibilty';
import Task from './Task';
import LinkTaskWithBoq from './LinkTaskWithBoq';
import LinkTasksModal from '../FinanceModule/LinkTasksModal';
import {
  DownloadDocument,
  Filter,
  DateIcon,
} from '../../components/common/Icons';
import {
  iconUseStyles,
  iconButtonUseStyles,
  largeIconUseStyles,
} from '../common/Theme';
import { AddUser } from '../common/Icons';
import ConfirmModal from '../common/ConfirmModal';
import AssignUserModal from './AssignUsersModal';
import LinkBoqsModal from './LinkBoqsModal';
import DeleteButton from './DeleteButton';
import { convertMomentToGMT } from './../../helpers/datehelper';
import DateEditor from './DateEditor';
import ManageTasksFilterModal from './manageTasksFilter';
import RescheduleTasksModal from './rescheduleTasks';
import {
  CustomFilterBadge,
  CustomBadgeContainer,
} from '../../components/common/CustomBadgeModule';
import { TOUR_IMAGES_PATHS, USER_GUIDE_LIMIT } from './../../constants';
import { updateUserGuide } from '../../actions/userActions';
import CustomTag from '../common/CustomTag';
import CustomOverlay from '../common/CustomOverlay';
import CategoryAssignedTooltip from './CategoryAssignedTooltip';
import {
  toastErrorMessage,
  toastInfoMessage,
} from '../../actions/toastactions';

/* Tour variables */
const TourContent = ({ content = '', step, src }) => {
  return (
    <div>
      <div className="py-2 h-fit d-flex flex-column">
        {src ? (
          <>
            <img src={src} alt={'animated'} width="380" className="mb-1" />
          </>
        ) : null}
        {content ? <span className="pt-3">{content}</span> : null}
      </div>
      <div className="reactour__step">{`${step}/3`}</div>
    </div>
  );
};

const tourConfig = [
  {
    selector: '[data-tut="mgtsk-add-tsk"]',
    content: () => {
      return (
        <TourContent
          key={'1'}
          step={'1'}
          src={TOUR_IMAGES_PATHS.MANAGE_TASK_ADD}
          content={'You can add and save multiple tasks from here'}
        />
      );
    },
  },
  {
    selector: '.mgtsk-col-heading',
    content: () => {
      return (
        <TourContent
          key={'2'}
          step={'2'}
          src={TOUR_IMAGES_PATHS.MANAGE_TASK_HEADING}
          content={'Apply custom filters and sort on any column from here'}
        />
      );
    },
  },
  {
    selector: '.mgtsk-checkbox',
    content: () => {
      return (
        <TourContent
          key={'3'}
          step={'3'}
          src={TOUR_IMAGES_PATHS.MANAGE_TASK_CHECKBOX}
          content={
            'Assign, edit and delete multiple tasks by selecting them all'
          }
        />
      );
    },
  },
];

const useStyles = makeStyles({
  root: {
    fontSize: '0.875rem',
    lineHeight: '1rem',
    color: '#90A0B7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
  },
  greyIcon: {
    color: variables.grey200,
  },
});

const dateComparator = (filterLocalDateAtMidnight, cellValue) => {
  const dateInMS = cellValue;

  if (dateInMS === 'dd/mm/yyyy') {
    return 0;
  }

  if (
    getTime(dateInMS, 'DD/MM/YYYY') < getTimeFromDate(filterLocalDateAtMidnight)
  ) {
    return -1;
  } else if (
    getTime(dateInMS, 'DD/MM/YYYY') > getTimeFromDate(filterLocalDateAtMidnight)
  ) {
    return 1;
  } else {
    return 0;
  }
};

const TagsRenderer = ({ tags }) => {
  if (tags.length) {
    return (
      <div className="d-flex">
        {tags.map(tag => (
          <CustomTag tagValue={tag.tag_name} key={tag._id} />
        ))}
      </div>
    );
  } else {
    return null;
  }
};

const textComparator = (filter, value, filterText) => {
  const filterTextLowerCase = filterText.toLowerCase();
  const valueLowerCase = value.toString().toLowerCase();

  switch (filter) {
    case 'contains':
      return valueLowerCase.indexOf(filterTextLowerCase) >= 0;
    case 'notContains':
      return valueLowerCase.indexOf(filterTextLowerCase) === -1;
    case 'Unassigned (type none)':
      return valueLowerCase === '';
    default:
      return false;
  }
};

const defaultColDef = {
  sortable: true,
  resizable: true,
  filter: true,
  filterParams: {
    buttons: ['reset'],
    newRowsAction: 'keep',
  },
  unSortIcon: true,
};

const columnDefs = [
  {
    headerName: '',
    field: '',
    checkboxSelection: params => {
      if (params.data._id) return true;
      return false;
    },
    filter: false,
    floatingFilter: false,
    width: 32,
    minWidth: 32,
    pinned: true,
    cellRendererSelector: params => {
      const deleteButton = {
        component: 'deleteButton',
      };

      if (!params.data._id) return deleteButton;
      else return null;
    },
    cellClass: params => {
      return !params.data._id
        ? ['p-0', 'm-auto', 'bg-button-grey']
        : ['p-0', 'm-auto'];
    },
    headerClass: 'mgtsk-checkbox',
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
  },
  {
    headerName: 'Task Name*',
    field: 'name',
    editable: true,
    width: 240,
    minWidth: 240,
    pinned: true,
    valueGetter: params => {
      return params.data.name;
    },
    valueSetter: params => {
      params.data.name = params.newValue;
      return true;
    },
    cellEditorFramework: Task,
    cellEditorParams: params => {
      return {
        name: params.data.name,
        _id: params.data._id,
      };
    },
    cellClass: params => {
      return !params.data._id ? ['text-grey', 'bg-button-grey'] : '';
    },
    comparator: (valA, valB, nodeA, nodeB, isInverted) => {
      if (!nodeA.data._id) return isInverted ? -1 : 1;
      if (!nodeB.data._id) return isInverted ? -1 : 1;
      return valA >= valB ? 1 : -1;
    },
  },
  {
    headerName: 'Tags',
    filter: false,
    resizable: true,
    valueGetter: params => {
      return params.data.tags;
    },
    field: 'tags',
    minWidth: 200,
    cellRenderer: 'tagsRenderer',
    cellRendererParams: params => {
      return {
        tags: params.data.tags || [],
      };
    },
  },
  {
    headerName: 'Work Category*',
    field: 'package_name',
    editable: params => {
      if (params.data._id) return false;
      return true;
    },
    width: 160,
    minWidth: 160,
    cellEditorFramework: SelectEditor,
    valueSetter: params => {
      params.data.package_name = params.newValue.label;
      params.data.package_id = params.newValue.value;
      return true;
    },
    cellClass: params => {
      return !params.data._id ? ['text-grey', 'bg-button-grey'] : '';
    },
    comparator: (valA, valB, nodeA, nodeB, isInverted) => {
      if (!nodeA.data._id) return isInverted ? -1 : 1;
      if (!nodeB.data._id) return isInverted ? -1 : 1;
      return valA >= valB ? 1 : -1;
    },
    suppressKeyboardEvent: params => {
      const KEY_ENTER = 13;
      const event = params.event;
      const key = event.which;
      const editingKeys = [KEY_ENTER];
      const suppress = params.editing && editingKeys.indexOf(key) >= 0;

      return suppress;
    },
  },
  {
    headerName: 'Start Date*',
    editable: true,
    filter: 'agDateColumnFilter',
    width: 140,
    minWidth: 140,
    cellEditorFramework: DateEditor,
    cellEditorParams: params => ({
      date: params.data.start_date,
    }),
    valueGetter: params => {
      return params.data.start_date !== 'dd/mm/yyyy' &&
        params.data.start_date !== 'is > end date'
        ? formatDate(params.data.start_date, 'DD/MM/YYYY')
        : params.data.start_date;
    },
    valueSetter: params => {
      params.data.start_date = params.newValue;

      return true;
    },
    cellStyle: params => {
      if (
        params.value === 'dd/mm/yyyy' ||
        isValid(params.value, 'DD/MM/YYYY')
      ) {
        return { color: 'black', borderBottomColor: 'transparent' };
      } else {
        return { color: 'red', borderBottomColor: 'red' };
      }
    },
    cellClass: params => {
      return !params.data._id ? ['text-grey', 'bg-button-grey'] : '';
    },
    headerClass: 'mgtsk-col-heading',
    filterParams: {
      comparator: dateComparator,
      buttons: ['reset'],
    },
    comparator: (valA, valB, nodeA, nodeB, isInverted) => {
      if (!nodeA.data._id) return isInverted ? -1 : 1;
      if (!nodeB.data._id) return isInverted ? -1 : 1;
      return nodeA.data.start_date >= nodeB.data.start_date ? 1 : -1;
    },
  },
  {
    headerName: 'End Date*',
    editable: true,
    filter: 'agDateColumnFilter',
    width: 140,
    minWidth: 140,
    cellEditorFramework: DateEditor,
    cellEditorParams: params => ({
      date: params.data.end_date,
    }),
    valueGetter: params => {
      return params.data.end_date !== 'dd/mm/yyyy' &&
        params.data.end_date !== 'is < start date'
        ? formatDate(params.data.end_date, 'DD/MM/YYYY')
        : params.data.end_date;
    },
    valueSetter: params => {
      params.data.end_date = params.newValue;

      return true;
    },
    cellStyle: params => {
      if (
        params.value === 'dd/mm/yyyy' ||
        isValid(params.value, 'DD/MM/YYYY')
      ) {
        return { color: 'black', borderBottomColor: 'transparent' };
      } else {
        return { color: 'red', borderBottomColor: 'red' };
      }
    },
    cellClass: params => {
      return !params.data._id ? ['text-grey', 'bg-button-grey'] : '';
    },
    filterParams: {
      comparator: dateComparator,
      buttons: ['reset'],
    },
    comparator: (valA, valB, nodeA, nodeB, isInverted) => {
      if (!nodeA.data._id) return isInverted ? -1 : 1;
      if (!nodeB.data._id) return isInverted ? -1 : 1;
      return nodeA.data.end_date >= nodeB.data.end_date ? 1 : -1;
    },
  },
  {
    headerName: 'Task Assigned To',
    field: 'assigned_users',
    width: 180,
    minWidth: 180,
    sortable: false,
    cellRenderer: 'assignUserOverlay',
    cellRendererParams: params => {
      return {
        taskId: params.data._id,
        taskName: params.data.name,
        projectId: params.data.project_id,
        taskUsers: params.data.assigned_users || [],
      };
    },
    cellClass: params => {
      return !params.data._id ? ['text-grey', 'bg-button-grey'] : '';
    },
    filterValueGetter: params => {
      const users = params.data.assigned_users || [];
      const userStr = users.map(elem => elem.name).join('');

      return userStr;
    },
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset'],
      filterOptions: ['contains', 'notContains', 'Unassigned (type none)'],
      textCustomComparator: textComparator,
    },
  },
  {
    headerName: 'Category Assigned To',
    editable: false,
    field: 'assigned_package_users',
    tooltipField: 'assigned_package_users',
    tooltipComponent: 'categoryAssignedTooltip',
    width: 180,
    minWidth: 180,
    sortable: false,
    cellRenderer: 'categoryUsers',
    cellRendererParams: params => {
      return {
        assignedUsers: params.data.assigned_package_users || [],
      };
    },
    cellClass: params => {
      return !params.data._id ? ['text-grey', 'bg-button-grey'] : '';
    },
    filterValueGetter: params => {
      const users = params.data.assigned_package_users || [];
      const userStr = users.map(elem => elem.name).join('');

      return userStr;
    },
    filter: 'agTextColumnFilter',
    filterParams: {
      buttons: ['reset'],
      filterOptions: ['contains', 'notContains', 'Unassigned (type none)'],
      textCustomComparator: textComparator,
    },
  },
  {
    headerName: 'Linked Budget Items',
    field: 'boqs',
    editable: false,
    width: 230,
    minWidth: 230,
    sortable: false,
    cellRenderer: 'linkBoq',
    cellClass: params => {
      return !params.data._id ? ['text-grey', 'bg-button-grey'] : '';
    },
    cellRendererParams: params => {
      return {
        taskId: params.data._id,
        taskName: params.data.name,
        projectId: params.data.project_id,
        taskBoqs: params.data.boqs || [],
        packageId: params.data.package_id,
      };
    },
  },
];

const ManageTasks = ({ eventKey }) => {
  const projectId = useSelector(state => state.projectreducer.selectedProj.id);
  const orgId = useSelector(state => state.organisationReducer.orgProfile._id);
  const tasks = useSelector(state => state.taskreducer.tasks);
  const filterValues = useSelector(state => state.taskreducer.filterValues);
  const ifFilter = useSelector(state => state.taskreducer.ifFilter);
  const packagesList = useSelector(state => state.packageReducer.packagesList);
  const pkgOptions = useSelector(state => state.packageReducer.packagesList);
  const refreshProjectPlan = useSelector(
    state => state.refreshReducer.sync_project_plan_view
  );
  const dispatch = useDispatch();

  const [rowData, setRowData] = useState([]);
  const [rowLength, setRowLength] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [dataMap, setDataMap] = useState(new Map());
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);
  const [selectedRowsName, setSelectedRowsName] = useState([]);
  const [selectedMilestoneTasks, setSelectedMilestoneTasks] = useState([]);
  const [selectedRowsIds, setSelectedRowsIds] = useState([]);
  const [areRowsSelected, setAreRowsSelected] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showBoqModal, setShowBoqModal] = useState(false);
  const [showLinkButton, setShowLinkButton] = useState(false);

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterBadges, setFilterBadges] = useState([]);
  const [rescheduleTaskValues, setRescheduleTaskValues] = useState({});
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showRescheduleConfirmModal, setShowRescheduleConfirmeModal] = useState(
    false
  );
  const [ifReschedule, setIfReschedule] = useState(false);
  const [isAgFilterApplied, setIsAgFilterApplied] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const guide = useSelector(state => state.userreducer.guide);
  const [currentGuideStep, setCurrentGuideStep] = useState(0);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const iconButtonClasses = iconButtonUseStyles();
  const iconClasses = iconUseStyles();
  const classes = useStyles();
  const getManageTaskGuide = localStorage.getItem('manageTaskGuide');
  const [isAddDisabled, setIsAddDisabled] = useState(false);

  const gridApi = useRef();
  const columnApi = useRef();

  /* Tour effects */
  useEffect(() => {
    if (currentGuideStep === 2) {
      dispatch(updateUserGuide({ key: 'manage_task' }));
    }
  }, [currentGuideStep]);

  useEffect(() => {
    if (
      guide.manage_task < USER_GUIDE_LIMIT &&
      getManageTaskGuide !== 'true' &&
      eventKey === 'tasks'
    ) {
      setIsTourOpen(true);
      localStorage.setItem('manageTaskGuide', 'true');
    }
  }, [eventKey]);

  useEffect(() => {
    dispatch(
      getAllTasksRequest({
        project_id: projectId,
        sort_option: '-createdAt',
      })
    );
    dispatch(
      getAllMilestones({ project_id: projectId, sort_option: '-createdAt' })
    );
    dispatch(getAllAgents('users-project/agents', { project_id: projectId }));
    if (packagesList.length === 0) {
      dispatch(
        getPackageListRequest('packages/list', { project_id: projectId })
      );
    }

    return () => {
      if (gridApi.current) {
        gridApi.current.setRowData([]);
      }
    };
  }, []);

  useEffect(() => {
    if (refreshProjectPlan) {
      dispatch(toastInfoMessage('Refreshing Task list'));
    }
  }, [refreshProjectPlan]);

  useEffect(() => {
    if (ifFilter && tasks.length) {
      const data = tasks.filter(task => {
        let user_arr = [];
        if (task.assigned_users !== undefined) {
          user_arr = task.assigned_users.map(user => user.name);
        }

        if (filterValues.package_name) {
          if (filterValues.package_name.includes(task.package_name)) {
            return task;
          }
        }
        if (filterValues.tag_name && filterValues.tag_name.length > 0) {
          if (task.tags) {
            for (const tag of task.tags) {
              if (filterValues.tag_name.includes(tag.tag_name)) {
                return true;
              }
            }
          }
        }
        if (filterValues.user_name) {
          let userArr = filterValues.user_name;
          let status = user_arr.some(user => {
            return userArr.includes(user);
          });

          if (status) {
            return task;
          }
        }

        if (filterValues.start_date || filterValues.end_date) {
          if (
            filterValues.start_date <= task.start_date &&
            filterValues.end_date >= task.end_date
          ) {
            return task;
          }
        }

        if (filterValues.not_assigned === 'notAssigned') {
          if (task.assigned_users === undefined) {
            return task;
          }
        }
      });
      setRowData(data);
      setRowLength(data.length);
    } else if (tasks.length) {
      const data = tasks.map(task => {
        return {
          _id: task._id,
          project_id: task.project_id,
          package_id: task.package_id,
          package_name: task.package_name,
          name: task.name,
          start_date: task.start_date,
          end_date: task.end_date,
          assigned_users: task.assigned_users,
          assigned_package_users: task.assigned_package_users,
          boqs: task.boqs,
          tags: task.tags,
        };
      });
      setRowData(data);
      setRowLength(data.length);
      setTotalCount(data.length);
    }

    setAreRowsSelected(false);
    setSelectedRowsName([]);
    setSelectedRowsIds([]);
    setSelectedMilestoneTasks([]);
  }, [tasks, ifFilter, filterValues]);

  useEffect(() => {
    let data = [];

    if (ifFilter) {
      if (filterValues.start_date) {
        data.push('Start Date');
      }
      if (filterValues.end_date) {
        data.push('End Date');
      }
      if (filterValues.package_id) {
        filterValues.package_name.map(name => {
          data.push(name);
        });
      }
      if (filterValues.user_id) {
        filterValues.user_name.map(name => {
          data.push(name);
        });
      }
      if (filterValues.tag_id) {
        filterValues.tag_name.map(name => {
          data.push(name);
        });
      }
      if (filterValues.not_assigned) {
        data.push('Not assigned to anyone');
      }
      if (data.length > 2) {
        setFilterBadges([data[0], data[1], `+${data.length - 2}`]);
      } else {
        setFilterBadges(data);
      }
    } else if (!ifFilter) {
      setFilterBadges([]);
    }
  }, [ifFilter, filterValues]);

  useEffect(() => {
    let selectedData = [];
    if (areRowsSelected && ifReschedule) {
      selectedData = gridApi.current.getSelectedRows();
      const updateTaskArr = [];

      selectedData.map(task => {
        if (selectedRowsIds.includes(task._id)) {
          let data = {};
          if (rescheduleTaskValues.Days) {
            let newStartDate = task.start_date + rescheduleTaskValues.Days;
            let newEndDate = task.end_date + rescheduleTaskValues.Days;
            data = {
              ...task,
              start_date: newStartDate,
              end_date: newEndDate,
            };
          } else if (rescheduleTaskValues.Weeks) {
            let newStartDate = task.start_date + rescheduleTaskValues.Weeks;
            let newEndDate = task.end_date + rescheduleTaskValues.Weeks;
            data = {
              ...task,
              start_date: newStartDate,
              end_date: newEndDate,
            };
          }
          updateTaskArr.push(data);
        }
      });

      dispatch(bulkUpdateTasks({ taskArr: updateTaskArr }));
      setIfReschedule(false);
    }
  }, [ifReschedule, areRowsSelected, rescheduleTaskValues]);

  const onGridReady = params => {
    gridApi.current = params.api;
    columnApi.current = params.columnApi;
    params.api.sizeColumnsToFit();
  };

  const frameworkComponents = {
    customLoadingCellRenderer: CustomSpinner,
    assignUserOverlay: AssignTaskResponsibility,
    categoryUsers: AssignCategoryResponsibilty,
    linkBoq: LinkTaskWithBoq,
    deleteButton: DeleteButton,
    dateRenderer: DateEditor,
    tagsRenderer: TagsRenderer,
    categoryAssignedTooltip: CategoryAssignedTooltip,
  };

  const addItems = () => {
    const newItems = [
      {
        name: `Enter Task Name`,
        project_id: projectId,
        package_name: pkgOptions.length ? pkgOptions[0].name : '',
        package_id: pkgOptions.length ? pkgOptions[0]._id : '',
        start_date: Date.now(),
        end_date: Date.now(),
        row_id: Date.now(),
      },
    ];
    gridApi.current.applyTransaction({ add: newItems, addIndex: 0 });
  };

  const onRemoveSelected = () => {
    const selectedData = gridApi.current.getSelectedRows();
    const taskIdArr = selectedData.map(task => task._id).filter(Boolean);

    if (taskIdArr.length) {
      dispatch(bulkDeleteData({ taskIdArr }));
    }

    gridApi.current.applyTransaction({ remove: selectedData });
    setShowConfirmModal(false);
  };
  const handleApplyFilter = () => {
    if (Object.keys(filterValues).length !== 0) {
      dispatch(setIfFilter(true));
      setIsAddDisabled(true);
    }

    onHide();
  };

  const handleResetFilter = () => {
    onHide();
    dispatch(setIfFilter(false));
    dispatch(setFilterValues({}));
    if (!isAgFilterApplied) {
      setIsAddDisabled(false);
    }
  };

  const handleApplyRescheduler = () => {
    if (Object.keys(rescheduleTaskValues).length !== 0) {
      setShowRescheduleConfirmeModal(true);
    }
    onHide();
  };

  const handleRescheduleSubmit = () => {
    setIfReschedule(true);
    setShowRescheduleConfirmeModal(false);
    setShowConfirmModal(false);
  };

  const onHide = () => {
    setShowFilterModal(false);
    setShowRescheduleModal(false);
    setShowMilestoneModal(false);
  };

  const onSelectionChanged = () => {
    const selectedData = gridApi.current.getSelectedRows();
    if (selectedData.length) {
      setAreRowsSelected(true);
    } else {
      setAreRowsSelected(false);
    }
    const taskNameArr = selectedData.map(task => task.name).filter(Boolean);
    const taskIdsArray = selectedData.map(task => task._id).filter(Boolean);
    const tasksArray = selectedData
      .map(task => {
        return { task_name: task.name, task_id: task._id };
      })
      .filter(Boolean);
    const pkgIdsArray = selectedData
      .map(task => task.package_id)
      .filter(Boolean);
    if (pkgIdsArray.length) {
      const flag =
        pkgIdsArray.reduce(function (a, b) {
          return a === b ? a : !b;
        }) === pkgIdsArray[0];
      if (flag) {
        setShowLinkButton(true);
      } else {
        setShowLinkButton(false);
      }
    }

    setSelectedRowsName(taskNameArr);
    setSelectedRowsIds(taskIdsArray);
    setSelectedMilestoneTasks(tasksArray);
  };

  const handleCellChange = params => {
    const { data } = params;
    const newDataMap = new Map(dataMap);

    data.is_error = false;
    gridApi.current.applyTransaction({
      update: [data],
    });
    newDataMap.set(data._id || data.row_id, data);
    setDataMap(newDataMap);
  };

  const handleDownloadDPR = () => {
    dispatch(
      generatePDF({
        org_id: orgId,
        project_id: projectId,
        report_type: 'dpr',
        task_ids_array: selectedRowsIds,
      })
    );
  };

  const handleSubmit = () => {
    const newTaskArr = [];
    const updateTaskArr = [];
    let hasError = false;

    for (const task of dataMap.values()) {
      if (
        !task.name ||
        !task.package_name ||
        !task.package_id ||
        !isValid(formatDate(task.start_date, 'DD/MM/YYYY'), 'DD/MM/YYYY') ||
        !isValid(formatDate(task.end_date, 'DD/MM/YYYY'), 'DD/MM/YYYY') ||
        task.start_date > task.end_date
      ) {
        task.is_error = true;
        gridApi.current.applyTransaction({
          update: [task],
        });
        hasError = true;
      } else {
        task.start_date = convertMomentToGMT(task.start_date);
        task.end_date = convertMomentToGMT(task.end_date);

        if (!task._id) {
          newTaskArr.push(task);
        } else {
          updateTaskArr.push(task);
        }
      }
    }

    if (hasError) {
      dispatch(toastErrorMessage('Please correct error in highlighted rows'));
      setShowSaveConfirmModal(false);
      return;
    }

    if (newTaskArr.length) {
      dispatch(bulkAddTasks({ taskArr: newTaskArr }));
    }
    if (updateTaskArr.length) {
      dispatch(bulkUpdateTasks({ taskArr: updateTaskArr }));
    }
    setShowSaveConfirmModal(false);
    setDataMap(new Map());
  };

  /* Tour Functions */
  const closeTour = () => {
    setIsTourOpen(false);
  };

  const openTour = () => {
    setIsTourOpen(true);
  };

  const largeIconClasses = largeIconUseStyles();

  return (
    <div className="ag-theme-material h-610 mx-2 fs-s d-flex flex-column bg-white">
      <Tour
        onRequestClose={closeTour}
        steps={tourConfig}
        isOpen={isTourOpen}
        rounded={5}
        className="guide-css"
        nextButton={<CustomButton className="guide-btn" label={'Next'} />}
        prevButton={<CustomButton className="guide-btn" label={'Prev'} />}
        lastStepNextButton={
          <CustomButton className="guide-btn" label={'Got it'} />
        }
        getCurrentStep={curr => {
          setCurrentGuideStep(curr);
        }}
      />
      <div className="d-flex mb-1 mt-3">
        <CustomButton
          variant="text"
          isDisabled={isAddDisabled}
          label="Add Task"
          startIcon={
            <AddIcon
              color={isAddDisabled ? 'disabled' : 'primary'}
              classes={iconClasses}
              fontSize="small"
            />
          }
          className="bg-button-grey mt-1 h-32 py-0 px-2 mr-3"
          handleSubmit={addItems}
          data-tut="mgtsk-add-tsk"
        />
        {areRowsSelected ? (
          <div className="d-flex align-items-center">
            <div className="mr-3">
              <CustomOverlay
                id="1"
                overlay={
                  <PopoverContent>
                    <span className="fs-s">Assign responsibility</span>
                  </PopoverContent>
                }
                placement="right-end"
              >
                <IconButton
                  classes={iconButtonClasses}
                  color="primary"
                  onClick={() => setShowUserModal(true)}
                >
                  <AddUser color="primary" classes={iconClasses} />
                </IconButton>
              </CustomOverlay>
            </div>
            {showLinkButton ? (
              <div className="mr-3">
                <CustomOverlay
                  id="2"
                  overlay={
                    <PopoverContent>
                      <span className="fs-s">Link budget items</span>
                    </PopoverContent>
                  }
                  placement="right-end"
                >
                  <IconButton
                    classes={iconButtonClasses}
                    color="primary"
                    onClick={() => setShowBoqModal(true)}
                  >
                    <LinkIcon color="primary" classes={iconClasses} />
                  </IconButton>
                </CustomOverlay>
              </div>
            ) : (
              <div className="mr-3">
                <CustomOverlay
                  id="3"
                  overlay={
                    <PopoverContent>
                      <span className="fs-s">
                        Only tasks of the same work category can be linked to
                        boqs
                      </span>
                    </PopoverContent>
                  }
                  placement="right-end"
                >
                  {/* necessary to allow hover on disabled button */}
                  <span>
                    <IconButton
                      classes={iconButtonClasses}
                      color="primary"
                      onClick={() => setShowBoqModal(true)}
                      disabled={true}
                    >
                      <LinkIcon color="primary" classes={iconClasses} />
                    </IconButton>
                  </span>
                </CustomOverlay>
              </div>
            )}
            <div className="mr-3">
              <CustomOverlay
                id="4"
                overlay={
                  <PopoverContent>
                    <span className="fs-s">Reschedule the tasks</span>
                  </PopoverContent>
                }
                placement="right-end"
              >
                <IconButton
                  classes={iconButtonClasses}
                  color="primary"
                  onClick={() => setShowRescheduleModal(true)}
                >
                  <DateIcon color="primary" classes={iconClasses} />
                </IconButton>
              </CustomOverlay>
            </div>
            <div className="mr-3">
              <CustomOverlay
                id="5"
                overlay={
                  <PopoverContent>
                    <span className="fs-s">Delete task</span>
                  </PopoverContent>
                }
                placement="right-end"
              >
                <IconButton
                  classes={iconButtonClasses}
                  color="primary"
                  onClick={() => setShowConfirmModal(true)}
                >
                  <DeleteOutlined color="error" classes={iconClasses} />
                </IconButton>
              </CustomOverlay>
            </div>
            <div className="mr-3">
              <CustomOverlay
                id="6"
                overlay={
                  <PopoverContent>
                    <span className="fs-s">Download DPR of selected Tasks</span>
                  </PopoverContent>
                }
                placement="right-end"
              >
                <IconButton
                  classes={iconButtonClasses}
                  color="primary"
                  onClick={handleDownloadDPR}
                >
                  <DownloadDocument color="primary" classes={iconClasses} />
                </IconButton>
              </CustomOverlay>
            </div>
            <div className="mr-3">
              <CustomOverlay
                id="7"
                overlay={
                  <PopoverContent>
                    <span className="fs-s">Link Tasks to Milestones</span>
                  </PopoverContent>
                }
                placement="right-end"
              >
                <IconButton
                  classes={iconButtonClasses}
                  color="primary"
                  onClick={() => setShowMilestoneModal(true)}
                >
                  <FlagIcon color="primary" classes={iconClasses} />
                </IconButton>
              </CustomOverlay>
            </div>
          </div>
        ) : null}

        <div className="d-flex my-1 mr-3">
          <CustomOverlay
            id="7"
            overlay={
              <PopoverContent>
                <span className="fs-s">Add filters to the tasks</span>
              </PopoverContent>
            }
            placement="right-end"
          >
            <IconButton
              classes={iconButtonClasses}
              color="primary"
              onClick={() => setShowFilterModal(true)}
            >
              <Filter color="primary" classes={iconClasses} />
            </IconButton>
          </CustomOverlay>
        </div>
        <div className="d-flex flex-row align-items-center w-50">
          <CustomBadgeContainer filter>
            {filterBadges.map((label, index) => (
              <CustomFilterBadge
                key={index}
                badgeLabel={label}
                badgeBGColor={variables.red200}
                badgeColor={variables.red700}
              />
            ))}
          </CustomBadgeContainer>
        </div>

        <div className="d-flex justify-content-end w-100">
          <div
            className={classes.root}
          >{`Showing ${rowLength}/${totalCount} Results`}</div>
          <CustomButton
            label="Save Details"
            onClick={() => setShowSaveConfirmModal(true)}
            variant="text"
            className="bg-button-grey px-2"
            isDisabled={!dataMap.size}
          />
        </div>
      </div>
      <AgTable
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        pagination={false}
        rowClassRules={{
          'bg-red-100': params => {
            return params.data.is_error;
          },
        }}
        frameworkComponents={frameworkComponents}
        loadingCellRenderer={'customLoadingCellRenderer'}
        loadingCellRendererParams={{ className: 'text-primary' }}
        onGridReady={onGridReady}
        onSelectionChanged={onSelectionChanged}
        rowDeselection={true}
        enableCellChangeFlash={false}
        suppressRowClickSelection={true}
        onCellValueChanged={handleCellChange}
        animateRows={true}
        tooltipShowDelay={0}
        tooltipComponent={'categoryAssignedTooltip'}
        isRowSelectable={rowNode => {
          return rowNode.data._id ? true : false;
        }}
        getRowHeight={() => {
          return 32;
        }}
        headerHeight={36}
        onGridSizeChanged={params => {
          params.api.sizeColumnsToFit();
        }}
        onFilterChanged={async () => {
          let isFilterApplied = false;
          const allFilter = gridApi.current.filterManager.allFilters;

          for (const value of allFilter.values()) {
            const result = await value.filterPromise;
            if (result.appliedModel !== null) {
              isFilterApplied = true;
              setIsAgFilterApplied(isFilterApplied);
              break;
            } else {
              setIsAgFilterApplied(isFilterApplied);
            }
          }
          if (isFilterApplied) {
            setIsAddDisabled(true);
            setRowLength(gridApi.current.getModel().rowsToDisplay.length);
          } else {
            if (!ifFilter) {
              setIsAddDisabled(false);
              setRowLength(gridApi.current.getModel().rowsToDisplay.length);
            } else if (ifFilter) {
              setRowLength(gridApi.current.getModel().rowsToDisplay.length);
            }
          }
        }}
      ></AgTable>
      <ConfirmModal
        show={showConfirmModal}
        handleSubmit={onRemoveSelected}
        handleClose={() => setShowConfirmModal(false)}
        itemsList={selectedRowsName}
        type="delete"
        item="tasks"
      />
      <ConfirmModal
        show={showSaveConfirmModal}
        handleSubmit={handleSubmit}
        handleClose={() => setShowSaveConfirmModal(false)}
        itemsList={[...dataMap.values()].map(val => {
          return val.name;
        })}
        type="save"
        item="tasks"
      />
      <ConfirmModal
        show={showRescheduleConfirmModal}
        handleSubmit={handleRescheduleSubmit}
        handleClose={() => setShowRescheduleConfirmeModal(false)}
        itemsList={selectedRowsName.map(taskName => {
          return taskName;
        })}
        type="update"
        item="tasks"
      />

      {showUserModal ? (
        <AssignUserModal
          show={showUserModal}
          onHide={() => setShowUserModal(false)}
          taskIdsArray={selectedRowsIds}
        />
      ) : null}
      {showBoqModal ? (
        <LinkBoqsModal
          show={showBoqModal}
          onHide={() => setShowBoqModal(false)}
          taskIdsArray={selectedRowsIds}
          packageId={
            gridApi.current.getSelectedRows().length
              ? gridApi.current.getSelectedRows()[0].package_id
              : ''
          }
        />
      ) : null}
      <ManageTasksFilterModal
        show={showFilterModal}
        onHide={onHide}
        handleApplyFilter={handleApplyFilter}
        handleResetFilter={handleResetFilter}
      />
      <RescheduleTasksModal
        show={showRescheduleModal}
        onHide={onHide}
        rescheduleTaskValues={rescheduleTaskValues}
        setRescheduleTaskValues={setRescheduleTaskValues}
        handleApplyRescheduler={handleApplyRescheduler}
      />
      <LinkTasksModal
        show={showMilestoneModal}
        onHide={onHide}
        selectedMilestoneTasks={selectedMilestoneTasks}
      />
      <div className="reactour__start z-30">
        <IconButton classes={iconButtonClasses} onClick={openTour}>
          <Info classes={largeIconClasses} />
        </IconButton>
      </div>
    </div>
  );
};

export default ManageTasks;