export function statusClass(status?: string): string {
    if (!status) {
        return '';
    }

    if (
        [
            'PENDING',
            'PREPARING',
            'COOKING',
            'AWAITING_ACCEPTANCE',
            'DRAFT',
        ].includes(status)
    ) {
        return 'gold';
    }

    if (['CANCELLED', 'REJECTED',].includes(status)) {
        return 'red';
    }

    if (['COMPLETED', 'HIDDEN',].includes(status)) {
        return 'gray';
    }

    return '';
}