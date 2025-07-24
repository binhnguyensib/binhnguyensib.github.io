import React from 'react';
import Logo from "../../../asset/resource/aeon.png";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
} from '@mui/material';
import i18n from '../../../i18n';

export interface ConfirmDialogProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string; 
    text1: string;
    //text2: string

}

export default function ConfirmDialog({ open, setOpen, onClose, onConfirm, onCancel, text1 }: ConfirmDialogProps) {
    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            handleClose();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                className: "p-4 rounded-lg",
                style: { borderRadius: 16 },
            }}
        >
            <DialogTitle>
                <Box className="flex flex-col items-center">
                    <img src={Logo} alt="logo" width={80} height={80} />
                </Box>
            </DialogTitle>

            <DialogContent className='flex flex-col items-center justify-center'>
                <Typography align="center" variant="body1" className="mb-2">
                    {text1}
                </Typography>
                
                <Box className="flex gap-3 mt-4 w-full">
                        <Button
                            variant="outlined"
                            onClick={handleCancel}
                            sx={{
                                borderColor: "#e464bc",
                                color: "#e464bc",
                                '&:hover': {
                                    borderColor: "#c3399a",
                                    backgroundColor: "rgba(228, 100, 188, 0.1)",
                                },
                                textTransform: 'none',
                                fontSize: "0.9rem",
                                flex: 1,
                                py: 1.5
                            }}
                        >
                            {i18n.t("confirmDialog.cancel.keep")}
                        </Button>
                        
                        <Button
                            variant="contained"
                            onClick={onConfirm}
                            sx={{
                                backgroundColor: "#e464bc",
                                '&:hover': {
                                    backgroundColor: "#c3399a",
                                },
                                '&:focus': {
                                    backgroundColor: "#b63383",
                                },
                                textTransform: 'none',
                                fontSize: "0.9rem",
                                flex: 1,
                                py: 1.5
                            }}
                        >
                            {i18n.t("confirmDialog.cancel.cancel")}
                        </Button>
                    </Box>
            </DialogContent>
        </Dialog>
    );
}
